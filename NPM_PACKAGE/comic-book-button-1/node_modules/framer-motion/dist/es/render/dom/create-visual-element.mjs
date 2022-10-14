import { htmlVisualElement } from '../html/visual-element.mjs';
import { svgVisualElement } from '../svg/visual-element.mjs';
import { isSVGComponent } from './utils/is-svg-component.mjs';

const createDomVisualElement = (Component, options) => {
    return isSVGComponent(Component)
        ? svgVisualElement(options, { enableHardwareAcceleration: false })
        : htmlVisualElement(options, { enableHardwareAcceleration: true });
};

export { createDomVisualElement };
