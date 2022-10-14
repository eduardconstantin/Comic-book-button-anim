import { useContext, useRef, useEffect } from 'react';
import { PresenceContext } from '../../context/PresenceContext.mjs';
import { useVisualElementContext } from '../../context/MotionContext/index.mjs';
import { useIsomorphicLayoutEffect } from '../../utils/use-isomorphic-effect.mjs';
import { LazyContext } from '../../context/LazyContext.mjs';
import { MotionConfigContext } from '../../context/MotionConfigContext.mjs';

function useVisualElement(Component, visualState, props, createVisualElement) {
    const parent = useVisualElementContext();
    const lazyContext = useContext(LazyContext);
    const presenceContext = useContext(PresenceContext);
    const reducedMotionConfig = useContext(MotionConfigContext).reducedMotion;
    const visualElementRef = useRef(undefined);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
    createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceId: presenceContext ? presenceContext.id : undefined,
            blockInitialAnimation: presenceContext
                ? presenceContext.initial === false
                : false,
            reducedMotionConfig,
        });
    }
    const visualElement = visualElementRef.current;
    useIsomorphicLayoutEffect(() => {
        visualElement && visualElement.syncRender();
    });
    useEffect(() => {
        if (visualElement && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
    });
    useIsomorphicLayoutEffect(() => () => visualElement && visualElement.notifyUnmount(), []);
    return visualElement;
}

export { useVisualElement };
