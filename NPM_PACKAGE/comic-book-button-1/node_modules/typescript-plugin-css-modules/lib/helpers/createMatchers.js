"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatchers = void 0;
var cssExtensions_1 = require("./cssExtensions");
var createMatchers = function (logger, options) {
    if (options === void 0) { options = {}; }
    // Allow custom matchers to be used, and handle bad matcher patterns.
    var isCSS = cssExtensions_1.createIsCSS();
    try {
        var customMatcher = options.customMatcher;
        if (customMatcher) {
            var customMatcherRegExp = new RegExp(customMatcher);
            isCSS = cssExtensions_1.createIsCSS(customMatcherRegExp);
        }
    }
    catch (e) {
        logger.error(e);
        // TODO: Provide error/warning to user.
    }
    // Create the relative CSS checker.
    var isRelativeCSS = cssExtensions_1.createIsRelativeCSS(isCSS);
    return { isCSS: isCSS, isRelativeCSS: isRelativeCSS };
};
exports.createMatchers = createMatchers;
