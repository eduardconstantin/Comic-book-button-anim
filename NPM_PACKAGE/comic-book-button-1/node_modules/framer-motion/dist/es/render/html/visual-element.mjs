import { visualElement } from '../index.mjs';
import { getOrigin, checkTargetForNewValues } from '../utils/setters.mjs';
import { buildHTMLStyles } from './utils/build-styles.mjs';
import { isCSSVariable } from '../dom/utils/is-css-variable.mjs';
import { parseDomVariant } from '../dom/utils/parse-dom-variant.mjs';
import { transformProps } from './utils/transform.mjs';
import { scrapeMotionValuesFromProps } from './utils/scrape-motion-values.mjs';
import { renderHTML } from './utils/render.mjs';
import { getDefaultValueType } from '../dom/value-types/defaults.mjs';
import { measureViewportBox } from '../../projection/utils/measure.mjs';

function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
const htmlConfig = {
    treeType: "dom",
    readValueFromInstance(domElement, key) {
        if (transformProps.has(key)) {
            const defaultType = getDefaultValueType(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            const computedStyle = getComputedStyle(domElement);
            const value = (isCSSVariable(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    },
    sortNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    },
    getBaseTarget(props, key) {
        var _a;
        return (_a = props.style) === null || _a === void 0 ? void 0 : _a[key];
    },
    measureViewportBox(element, { transformPagePoint }) {
        return measureViewportBox(element, transformPagePoint);
    },
    /**
     * Reset the transform on the current Element. This is called as part
     * of a batched process across the entire layout tree. To remove this write
     * cycle it'd be interesting to see if it's possible to "undo" all the current
     * layout transforms up the tree in the same way this.getBoundingBoxWithoutTransforms
     * works
     */
    resetTransform(element, domElement, props) {
        const { transformTemplate } = props;
        domElement.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        // Ensure that whatever happens next, we restore our transform on the next frame
        element.scheduleRender();
    },
    restoreTransform(instance, mutableState) {
        instance.style.transform = mutableState.style.transform;
    },
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    },
    /**
     * Ensure that HTML and Framer-specific value types like `px`->`%` and `Color`
     * can be animated by Motion.
     */
    makeTargetAnimatable(element, { transition, transitionEnd, ...target }, { transformValues }, isMounted = true) {
        let origin = getOrigin(target, transition || {}, element);
        /**
         * If Framer has provided a function to convert `Color` etc value types, convert them
         */
        if (transformValues) {
            if (transitionEnd)
                transitionEnd = transformValues(transitionEnd);
            if (target)
                target = transformValues(target);
            if (origin)
                origin = transformValues(origin);
        }
        if (isMounted) {
            checkTargetForNewValues(element, target, origin);
            const parsed = parseDomVariant(element, target, origin, transitionEnd);
            transitionEnd = parsed.transitionEnd;
            target = parsed.target;
        }
        return {
            transition,
            transitionEnd,
            ...target,
        };
    },
    scrapeMotionValuesFromProps,
    build(element, renderState, latestValues, options, props) {
        if (element.isVisible !== undefined) {
            renderState.style.visibility = element.isVisible
                ? "visible"
                : "hidden";
        }
        buildHTMLStyles(renderState, latestValues, options, props.transformTemplate);
    },
    render: renderHTML,
};
const htmlVisualElement = visualElement(htmlConfig);

export { getComputedStyle, htmlConfig, htmlVisualElement };
