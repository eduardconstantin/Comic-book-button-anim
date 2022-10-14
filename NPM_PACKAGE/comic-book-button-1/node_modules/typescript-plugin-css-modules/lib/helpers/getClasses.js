"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClasses = exports.getFileType = void 0;
var path_1 = __importDefault(require("path"));
var less_1 = __importDefault(require("less"));
var sass_1 = __importDefault(require("sass"));
var stylus_1 = __importDefault(require("stylus"));
var icss_utils_1 = require("icss-utils");
var tsconfig_paths_1 = require("tsconfig-paths");
var sassTildeImporter_1 = require("../importers/sassTildeImporter");
var getFileType = function (fileName) {
    if (fileName.endsWith('.css'))
        return "css" /* css */;
    if (fileName.endsWith('.less'))
        return "less" /* less */;
    if (fileName.endsWith('.sass'))
        return "sass" /* sass */;
    if (fileName.endsWith('.styl'))
        return "styl" /* styl */;
    return "scss" /* scss */;
};
exports.getFileType = getFileType;
var getFilePath = function (fileName) { return path_1.default.dirname(fileName); };
var getClasses = function (_a) {
    var css = _a.css, fileName = _a.fileName, logger = _a.logger, options = _a.options, processor = _a.processor, compilerOptions = _a.compilerOptions;
    try {
        var fileType = exports.getFileType(fileName);
        var rendererOptions = options.rendererOptions || {};
        var transformedCss_1 = '';
        if (options.customRenderer) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            var customRenderer = require(options.customRenderer);
            transformedCss_1 = customRenderer(css, {
                fileName: fileName,
                logger: logger,
                compilerOptions: compilerOptions,
            });
        }
        else if (fileType === "less" /* less */) {
            less_1.default.render(css, __assign({ syncImport: true, filename: fileName }, (rendererOptions.less || {})), function (error, output) {
                if (error || output === undefined)
                    throw error;
                transformedCss_1 = output.css.toString();
            });
        }
        else if (fileType === "scss" /* scss */ || fileType === "sass" /* sass */) {
            var filePath = getFilePath(fileName);
            var _b = rendererOptions.sass || {}, includePaths = _b.includePaths, sassOptions = __rest(_b, ["includePaths"]);
            var baseUrl = compilerOptions.baseUrl, paths = compilerOptions.paths;
            var matchPath_1 = baseUrl && paths ? tsconfig_paths_1.createMatchPath(path_1.default.resolve(baseUrl), paths) : null;
            var aliasImporter = function (url) {
                var newUrl = matchPath_1 !== null ? matchPath_1(url) : undefined;
                return newUrl ? { file: newUrl } : null;
            };
            var importers = [aliasImporter, sassTildeImporter_1.sassTildeImporter];
            transformedCss_1 = sass_1.default
                .renderSync(__assign({ file: fileName, indentedSyntax: fileType === "sass" /* sass */, includePaths: __spreadArray([filePath, 'node_modules'], (includePaths || [])), importer: importers }, sassOptions))
                .css.toString();
        }
        else if (fileType === "styl" /* styl */) {
            transformedCss_1 = stylus_1.default(css, __assign(__assign({}, (rendererOptions.stylus || {})), { filename: fileName })).render();
        }
        else {
            transformedCss_1 = css;
        }
        var processedCss = processor.process(transformedCss_1, {
            from: fileName,
        });
        return processedCss.root ? icss_utils_1.extractICSS(processedCss.root).icssExports : {};
    }
    catch (e) {
        logger.error(e);
        return {};
    }
};
exports.getClasses = getClasses;
