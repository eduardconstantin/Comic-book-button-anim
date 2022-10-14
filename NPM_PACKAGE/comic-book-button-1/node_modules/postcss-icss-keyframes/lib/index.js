"use strict";

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _icssUtils = require("icss-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint-env node */


var plugin = "postcss-icss-keyframes";

var reserved = ["none", "inherited", "initial", "unset",
/* single-timing-function */
"linear", "ease", "ease-in", "ease-in-out", "ease-out", "step-start", "step-end", "start", "end",
/* single-animation-iteration-count */
"infinite",
/* single-animation-direction */
"normal", "reverse", "alternate", "alternate-reverse",
/* single-animation-fill-mode */
"forwards", "backwards", "both",
/* single-animation-play-state */
"running", "paused"];

var badNamePattern = /^[0-9]/;

var defaultGenerator = function defaultGenerator(name, path) {
  var sanitized = path.replace(/^.*[\/\\]/, "").replace(/[\W_]+/g, "_").replace(/^_|_$/g, "");
  return `__${sanitized}__${name}`;
};

var includes = function includes(array, item) {
  return array.indexOf(item) !== -1;
};

module.exports = _postcss2.default.plugin(plugin, function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (css, result) {
    var _result$messages;

    var generateScopedName = options.generateScopedName || defaultGenerator;

    var _extractICSS = (0, _icssUtils.extractICSS)(css),
        icssImports = _extractICSS.icssImports,
        icssExports = _extractICSS.icssExports;

    var keyframesExports = Object.create(null);

    css.walkAtRules(/keyframes$/, function (atrule) {
      var name = atrule.params;
      if (includes(reserved, name)) {
        return result.warn(`Unable to use reserve '${name}' animation name`, {
          node: atrule
        });
      }
      if (badNamePattern.test(name)) {
        return result.warn(`Invalid animation name identifier '${name}'`, {
          node: atrule
        });
      }
      if (icssExports[name]) {
        result.warn(`'${name}' identifier is already declared and will be override`, { node: atrule });
      }
      var alias = keyframesExports[name] || generateScopedName(name, css.source.input.from, css.source.input.css);
      keyframesExports[name] = alias;
      atrule.params = alias;
    });

    css.walkDecls(/animation$|animation-name$/, function (decl) {
      var parsed = (0, _postcssValueParser2.default)(decl.value);
      parsed.nodes.forEach(function (node) {
        var alias = keyframesExports[node.value];
        if (node.type === "word" && Boolean(alias)) {
          node.value = alias;
        }
      });
      decl.value = parsed.toString();
    });

    var exports = Object.assign(icssExports, keyframesExports);
    var messages = Object.keys(exports).map(function (name) {
      return {
        plugin,
        type: "icss-scoped",
        name,
        value: icssExports[name]
      };
    });
    css.prepend((0, _icssUtils.createICSSRules)(icssImports, exports));
    (_result$messages = result.messages).push.apply(_result$messages, _toConsumableArray(messages));
  };
});