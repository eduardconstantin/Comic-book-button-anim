"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExports = void 0;
var reserved_words_1 = __importDefault(require("reserved-words"));
var classTransforms_1 = require("./classTransforms");
var NOT_CAMELCASE_REGEXP = /[\-_]/;
var classNameToProperty = function (className) { return "'" + className + "': string;"; };
var classNameToNamedExport = function (className) {
    return "export let " + className + ": string;";
};
var flattenClassNames = function (previousValue, currentValue) {
    if (previousValue === void 0) { previousValue = []; }
    return previousValue.concat(currentValue);
};
var createExports = function (_a) {
    var classes = _a.classes, fileName = _a.fileName, logger = _a.logger, options = _a.options;
    var isCamelCase = function (className) {
        return !NOT_CAMELCASE_REGEXP.test(className);
    };
    var isReservedWord = function (className) { return !reserved_words_1.default.check(className); };
    var processedClasses = Object.keys(classes)
        .map(classTransforms_1.transformClasses(options.classnameTransform))
        .reduce(flattenClassNames, []);
    var camelCasedKeys = processedClasses
        .filter(isCamelCase)
        .filter(isReservedWord)
        .map(classNameToNamedExport);
    var dts = "declare let classes: {\n" + processedClasses.map(classNameToProperty).join('\n  ') + "\n};\nexport default classes;\n";
    if (options.namedExports !== false && camelCasedKeys.length) {
        dts += camelCasedKeys.join('\n') + '\n';
    }
    if (options.customTemplate) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var customTemplate = require(options.customTemplate);
        return customTemplate(dts, {
            classes: classes,
            fileName: fileName,
            logger: logger,
        });
    }
    return dts;
};
exports.createExports = createExports;
