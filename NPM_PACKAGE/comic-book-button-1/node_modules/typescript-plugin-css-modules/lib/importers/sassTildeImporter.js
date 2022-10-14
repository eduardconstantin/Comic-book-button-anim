"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sassTildeImporter = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
/**
 * Creates a sass importer which resolves Webpack-style tilde-imports.
 */
var sassTildeImporter = function (rawImportPath, source) {
    // We only care about tilde-prefixed imports that do not look like paths.
    if (!rawImportPath.startsWith('~') || rawImportPath.startsWith('~/')) {
        return null;
    }
    // Create subpathsWithExts such that it has entries of the form
    // node_modules/@foo/bar/baz.(scss|sass)
    // for an import of the form ~@foo/bar/baz(.(scss|sass))?
    var nodeModSubpath = path_1.default.join('node_modules', rawImportPath.substring(1));
    var subpathsWithExts = [];
    if (nodeModSubpath.endsWith('.scss') ||
        nodeModSubpath.endsWith('.sass') ||
        nodeModSubpath.endsWith('.css')) {
        subpathsWithExts.push(nodeModSubpath);
    }
    else {
        // Look for .scss first.
        subpathsWithExts.push(nodeModSubpath + ".scss", nodeModSubpath + ".sass", nodeModSubpath + ".css");
    }
    // Support index files.
    subpathsWithExts.push(nodeModSubpath + "/_index.scss", nodeModSubpath + "/_index.sass");
    // Support sass partials by including paths where the file is prefixed by an underscore.
    var basename = path_1.default.basename(nodeModSubpath);
    if (!basename.startsWith('_')) {
        var partials = subpathsWithExts.map(function (file) {
            return file.replace(basename, "_" + basename);
        });
        subpathsWithExts.push.apply(subpathsWithExts, partials);
    }
    // Climbs the filesystem tree until we get to the root, looking for the first
    // node_modules directory which has a matching module and filename.
    var prevDir = '';
    var dir = path_1.default.dirname(source);
    while (prevDir !== dir) {
        var searchPaths = subpathsWithExts.map(function (subpathWithExt) {
            return path_1.default.join(dir, subpathWithExt);
        });
        for (var _i = 0, searchPaths_1 = searchPaths; _i < searchPaths_1.length; _i++) {
            var searchPath = searchPaths_1[_i];
            if (fs_1.default.existsSync(searchPath)) {
                return { file: searchPath };
            }
        }
        prevDir = dir;
        dir = path_1.default.dirname(dir);
    }
    // Returning null is not itself an error, it tells sass to instead try the
    // next import resolution method if one exists
    return null;
};
exports.sassTildeImporter = sassTildeImporter;
