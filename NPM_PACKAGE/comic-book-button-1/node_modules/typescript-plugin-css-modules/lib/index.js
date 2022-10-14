"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var postcss_1 = __importDefault(require("postcss"));
var postcss_icss_selectors_1 = __importDefault(require("postcss-icss-selectors"));
var postcss_icss_keyframes_1 = __importDefault(require("postcss-icss-keyframes"));
var postcss_load_config_1 = __importDefault(require("postcss-load-config"));
var postcss_filter_plugins_1 = __importDefault(require("postcss-filter-plugins"));
var tsserverlibrary_1 = __importDefault(require("typescript/lib/tsserverlibrary"));
var createMatchers_1 = require("./helpers/createMatchers");
var getDtsSnapshot_1 = require("./helpers/getDtsSnapshot");
var logger_1 = require("./helpers/logger");
var getPostCssConfigPlugins = function (directory) {
    try {
        return postcss_load_config_1.default.sync({}, directory).plugins;
    }
    catch (error) {
        return [];
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function init(_a) {
    var ts = _a.typescript;
    var _isCSS;
    function create(info) {
        var logger = logger_1.createLogger(info);
        var directory = info.project.getCurrentDirectory();
        var compilerOptions = info.project.getCompilerOptions();
        // TypeScript plugins have a `cwd` of `/`, which causes issues with import resolution.
        process.chdir(directory);
        // User options for plugin.
        var options = info.config.options || {};
        logger.log("options: " + JSON.stringify(options));
        // Load environment variables like SASS_PATH.
        // TODO: Add tests for this option.
        var dotenvOptions = options.dotenvOptions || {};
        if (dotenvOptions) {
            dotenvOptions.path = path_1.default.resolve(directory, dotenvOptions.path || '.env');
        }
        dotenv_1.default.config(dotenvOptions);
        // Normalise SASS_PATH array to absolute paths.
        if (process.env.SASS_PATH) {
            process.env.SASS_PATH = process.env.SASS_PATH.split(path_1.default.delimiter)
                .map(function (sassPath) {
                return path_1.default.isAbsolute(sassPath)
                    ? sassPath
                    : path_1.default.resolve(directory, sassPath);
            })
                .join(path_1.default.delimiter);
        }
        // Add postCSS config if enabled.
        var postcssOptions = options.postcssOptions || options.postCssOptions || {};
        var userPlugins = [];
        if (postcssOptions.useConfig) {
            var postcssConfig = getPostCssConfigPlugins(directory);
            userPlugins = __spreadArray([
                postcss_filter_plugins_1.default({
                    exclude: postcssOptions.excludePlugins,
                    silent: true,
                })
            ], postcssConfig);
        }
        // If a custom renderer is provided, resolve the path.
        if (options.customRenderer) {
            if (fs_1.default.existsSync(path_1.default.resolve(directory, options.customRenderer))) {
                options.customRenderer = path_1.default.resolve(directory, options.customRenderer);
            }
            else if (fs_1.default.existsSync(require.resolve(options.customRenderer))) {
                options.customRenderer = require.resolve(options.customRenderer);
            }
            else {
                logger.error(new Error("The file or package for `customRenderer` '" + options.customRenderer + "' could not be resolved."));
            }
        }
        // If a custom template is provided, resolve the path.
        if (options.customTemplate) {
            options.customTemplate = path_1.default.resolve(directory, options.customTemplate);
        }
        // Create PostCSS processor.
        var processor = postcss_1.default(__spreadArray(__spreadArray([], userPlugins), [
            postcss_icss_selectors_1.default({ mode: 'local' }),
            postcss_icss_keyframes_1.default(),
        ]));
        // Create matchers using options object.
        var _a = createMatchers_1.createMatchers(logger, options), isCSS = _a.isCSS, isRelativeCSS = _a.isRelativeCSS;
        _isCSS = isCSS;
        // Creates new virtual source files for the CSS modules.
        var _createLanguageServiceSourceFile = ts.createLanguageServiceSourceFile;
        ts.createLanguageServiceSourceFile = function (fileName, scriptSnapshot) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            if (isCSS(fileName)) {
                scriptSnapshot = getDtsSnapshot_1.getDtsSnapshot(ts, processor, fileName, scriptSnapshot, options, logger, compilerOptions);
            }
            var sourceFile = _createLanguageServiceSourceFile.apply(void 0, __spreadArray([fileName,
                scriptSnapshot], rest));
            if (isCSS(fileName)) {
                sourceFile.isDeclarationFile = true;
            }
            return sourceFile;
        };
        // Updates virtual source files as files update.
        var _updateLanguageServiceSourceFile = ts.updateLanguageServiceSourceFile;
        ts.updateLanguageServiceSourceFile = function (sourceFile, scriptSnapshot) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            if (isCSS(sourceFile.fileName)) {
                scriptSnapshot = getDtsSnapshot_1.getDtsSnapshot(ts, processor, sourceFile.fileName, scriptSnapshot, options, logger, compilerOptions);
            }
            sourceFile = _updateLanguageServiceSourceFile.apply(void 0, __spreadArray([sourceFile,
                scriptSnapshot], rest));
            if (isCSS(sourceFile.fileName)) {
                sourceFile.isDeclarationFile = true;
            }
            return sourceFile;
        };
        if (info.languageServiceHost.resolveModuleNames) {
            var _resolveModuleNames_1 = info.languageServiceHost.resolveModuleNames.bind(info.languageServiceHost);
            info.languageServiceHost.resolveModuleNames = function (moduleNames, containingFile) {
                var rest = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    rest[_i - 2] = arguments[_i];
                }
                var resolvedModules = _resolveModuleNames_1.apply(void 0, __spreadArray([moduleNames,
                    containingFile], rest));
                return moduleNames.map(function (moduleName, index) {
                    try {
                        if (isRelativeCSS(moduleName)) {
                            return {
                                extension: tsserverlibrary_1.default.Extension.Dts,
                                isExternalLibraryImport: false,
                                resolvedFileName: path_1.default.resolve(path_1.default.dirname(containingFile), moduleName),
                            };
                        }
                        else if (isCSS(moduleName)) {
                            // TODO: Move this section to a separate file and add basic tests.
                            // Attempts to locate the module using TypeScript's previous search paths. These include "baseUrl" and "paths".
                            var failedModule = info.project.getResolvedModuleWithFailedLookupLocationsFromCache(moduleName, containingFile);
                            var baseUrl_1 = info.project.getCompilerOptions().baseUrl;
                            var match_1 = '/index.ts';
                            // An array of paths TypeScript searched for the module. All include .ts, .tsx, .d.ts, or .json extensions.
                            // NOTE: TypeScript doesn't expose this in their interfaces, which is why the type is unkown.
                            // https://github.com/microsoft/TypeScript/issues/28770
                            var failedLocations = failedModule.failedLookupLocations;
                            // Filter to only one extension type, and remove that extension. This leaves us with the actual filename.
                            // Example: "usr/person/project/src/dir/File.module.css/index.d.ts" > "usr/person/project/src/dir/File.module.css"
                            var normalizedLocations = failedLocations.reduce(function (locations, location) {
                                if ((baseUrl_1 ? location.includes(baseUrl_1) : true) &&
                                    location.endsWith(match_1)) {
                                    return __spreadArray(__spreadArray([], locations), [location.replace(match_1, '')]);
                                }
                                return locations;
                            }, []);
                            // Find the imported CSS module, if it exists.
                            var cssModulePath = normalizedLocations.find(function (location) {
                                return fs_1.default.existsSync(location);
                            });
                            if (cssModulePath) {
                                return {
                                    extension: tsserverlibrary_1.default.Extension.Dts,
                                    isExternalLibraryImport: false,
                                    resolvedFileName: path_1.default.resolve(cssModulePath),
                                };
                            }
                        }
                    }
                    catch (e) {
                        logger.error(e);
                        return resolvedModules[index];
                    }
                    return resolvedModules[index];
                });
            };
        }
        return info.languageService;
    }
    function getExternalFiles(project) {
        return project.getFileNames().filter(_isCSS);
    }
    return { create: create, getExternalFiles: getExternalFiles };
}
module.exports = init;
