export declare const buttonAnim: {
    init: {
        translateX: number[];
        scale: number;
        textShadow: string[];
        filter: string[];
        transition: {
            duration: number;
            ease: number[];
        };
    };
    hover: (custom: number) => {
        translateX: number[];
        textShadow: string[];
        filter: string[];
        transition: {
            duration: number;
            ease: number[];
        };
    };
    tap: {
        scale: number;
        transition: {
            duration: number;
            ease: number[];
        };
    };
};
export declare const clickAnim: {
    init: (custom: number) => {
        x: number;
        scale: number;
        opacity: number;
        transition: {
            duration: number;
        };
    };
    anim: {};
    tap: (custom: number) => {
        x: number;
        opacity: number;
        scale: number;
        transition: {
            duration: number;
        };
    };
};
