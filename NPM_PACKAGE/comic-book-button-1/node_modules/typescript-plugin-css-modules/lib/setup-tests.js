"use strict";
// TODO: Remove this when the related issue is resolved.
// https://github.com/css-modules/postcss-icss-keyframes/issues/3
var warn = global.console.warn;
global.console.warn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var isPostCSSDeprecationWarning = typeof args[0] === 'string' &&
        args[0].includes('postcss.plugin was deprecated');
    if (isPostCSSDeprecationWarning) {
        return;
    }
    warn.apply(void 0, args);
};
