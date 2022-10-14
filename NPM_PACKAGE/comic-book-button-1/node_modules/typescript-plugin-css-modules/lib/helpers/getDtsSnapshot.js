"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDtsSnapshot = void 0;
var getClasses_1 = require("./getClasses");
var createExports_1 = require("./createExports");
var getDtsSnapshot = function (ts, processor, fileName, scriptSnapshot, options, logger, compilerOptions) {
    var css = scriptSnapshot.getText(0, scriptSnapshot.getLength());
    /*
     * TODO: Temporary workaround for:
     * https://github.com/mrmckeb/typescript-plugin-css-modules/issues/41
     * Needs investigation for a more elegant solution.
     */
    if (/export default classes/.test(css)) {
        return scriptSnapshot;
    }
    var classes = getClasses_1.getClasses({
        css: css,
        fileName: fileName,
        logger: logger,
        options: options,
        processor: processor,
        compilerOptions: compilerOptions,
    });
    var dts = createExports_1.createExports({ classes: classes, fileName: fileName, logger: logger, options: options });
    return ts.ScriptSnapshot.fromString(dts);
};
exports.getDtsSnapshot = getDtsSnapshot;
