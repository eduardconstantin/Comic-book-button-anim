import { SubscriptionManager } from '../../utils/subscription-manager.mjs';

const names = [
    "LayoutMeasure",
    "BeforeLayoutMeasure",
    "LayoutUpdate",
    "ViewportBoxUpdate",
    "Update",
    "Render",
    "AnimationComplete",
    "LayoutAnimationComplete",
    "AnimationStart",
    "LayoutAnimationStart",
    "SetAxisTarget",
    "Unmount",
];
function createLifecycles() {
    const managers = names.map(() => new SubscriptionManager());
    const propSubscriptions = {};
    const lifecycles = {
        clearAllListeners: () => managers.forEach((manager) => manager.clear()),
        updatePropListeners: (props) => {
            names.forEach((name) => {
                var _a;
                const on = "on" + name;
                const propListener = props[on];
                // Unsubscribe existing subscription
                (_a = propSubscriptions[name]) === null || _a === void 0 ? void 0 : _a.call(propSubscriptions);
                // Add new subscription
                if (propListener) {
                    propSubscriptions[name] = lifecycles[on](propListener);
                }
            });
        },
    };
    managers.forEach((manager, i) => {
        lifecycles["on" + names[i]] = (handler) => manager.add(handler);
        lifecycles["notify" + names[i]] = (...args) => manager.notify(...args);
    });
    return lifecycles;
}

export { createLifecycles };
