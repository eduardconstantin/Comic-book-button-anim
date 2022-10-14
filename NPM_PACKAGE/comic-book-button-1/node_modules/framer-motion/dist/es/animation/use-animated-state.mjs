import { useState, useEffect } from 'react';
import { useConstant } from '../utils/use-constant.mjs';
import { getOrigin, checkTargetForNewValues } from '../render/utils/setters.mjs';
import { visualElement } from '../render/index.mjs';
import { animateVisualElement } from '../render/utils/animation.mjs';
import { makeUseVisualState } from '../motion/utils/use-visual-state.mjs';
import { createBox } from '../projection/geometry/models.mjs';

const createObject = () => ({});
const stateVisualElement = visualElement({
    build() { },
    measureViewportBox: createBox,
    resetTransform() { },
    restoreTransform() { },
    removeValueFromRenderState() { },
    render() { },
    scrapeMotionValuesFromProps: createObject,
    readValueFromInstance(_state, key, options) {
        return options.initialState[key] || 0;
    },
    makeTargetAnimatable(element, { transition, transitionEnd, ...target }) {
        const origin = getOrigin(target, transition || {}, element);
        checkTargetForNewValues(element, target, origin);
        return { transition, transitionEnd, ...target };
    },
});
const useVisualState = makeUseVisualState({
    scrapeMotionValuesFromProps: createObject,
    createRenderState: createObject,
});
/**
 * This is not an officially supported API and may be removed
 * on any version.
 */
function useAnimatedState(initialState) {
    const [animationState, setAnimationState] = useState(initialState);
    const visualState = useVisualState({}, false);
    const element = useConstant(() => stateVisualElement({ props: {}, visualState }, { initialState }));
    useEffect(() => {
        element.mount({});
        return element.unmount;
    }, [element]);
    useEffect(() => {
        element.setProps({
            onUpdate: (v) => {
                setAnimationState({ ...v });
            },
        });
    }, [setAnimationState, element]);
    const startAnimation = useConstant(() => (animationDefinition) => {
        return animateVisualElement(element, animationDefinition);
    });
    return [animationState, startAnimation];
}

export { useAnimatedState };
