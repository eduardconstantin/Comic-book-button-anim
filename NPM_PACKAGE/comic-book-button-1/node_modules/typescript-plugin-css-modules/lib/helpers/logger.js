"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
var createLogger = function (info) {
    var log = function (message) {
        info.project.projectService.logger.info("[typescript-plugin-css-modules] " + message);
    };
    var error = function (error) {
        log("Failed " + error.toString());
        log("Stack trace: " + error.stack);
    };
    return {
        log: log,
        error: error,
    };
};
exports.createLogger = createLogger;
