import { visualElement } from '../index.mjs';
import { scrapeMotionValuesFromProps } from './utils/scrape-motion-values.mjs';
import { htmlConfig } from '../html/visual-element.mjs';
import { buildSVGAttrs } from './utils/build-attrs.mjs';
import { camelToDash } from '../dom/utils/camel-to-dash.mjs';
import { camelCaseAttributes } from './utils/camel-case-attrs.mjs';
import { transformProps } from '../html/utils/transform.mjs';
import { renderSVG } from './utils/render.mjs';
import { getDefaultValueType } from '../dom/value-types/defaults.mjs';

const svgVisualElement = visualElement({
    ...htmlConfig,
    getBaseTarget(props, key) {
        return props[key];
    },
    readValueFromInstance(domElement, key) {
        var _a;
        if (transformProps.has(key)) {
            return ((_a = getDefaultValueType(key)) === null || _a === void 0 ? void 0 : _a.default) || 0;
        }
        key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
        return domElement.getAttribute(key);
    },
    scrapeMotionValuesFromProps,
    build(_element, renderState, latestValues, options, props) {
        buildSVGAttrs(renderState, latestValues, options, props.transformTemplate);
    },
    render: renderSVG,
});

export { svgVisualElement };
