"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIsRelativeCSS = exports.createIsCSS = void 0;
var DEFAULT_REGEXP = /\.module\.(((c|le|sa|sc)ss)|styl)$/;
var isRelative = function (fileName) { return /^\.\.?($|[\\/])/.test(fileName); };
var createIsCSS = function (customMatcher) {
    if (customMatcher === void 0) { customMatcher = DEFAULT_REGEXP; }
    return function (fileName) {
        return customMatcher.test(fileName);
    };
};
exports.createIsCSS = createIsCSS;
var createIsRelativeCSS = function (isCSS) {
    return function (fileName) {
        return isCSS(fileName) && isRelative(fileName);
    };
};
exports.createIsRelativeCSS = createIsRelativeCSS;
