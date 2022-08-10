export const buttonAnim = {
	init: {
		translateX: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		scale: 1,
		filter: [
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
		],
		transition: {
			duration: 0.1,
			ease: [0.455, 0.03, 0.515, 0.955],
		},
	},
	hover: (custom) => ({
		translateX: [0, -custom, custom, -custom + 2, custom - 8, -custom + 8, custom - 2, -custom, custom, 0],
		filter: [
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
			'drop-shadow(-5px 0px 1px #ff006a) drop-shadow(5px 0px 1px #00dcff)',
			'drop-shadow(5px 0px 1px #ff006a) drop-shadow(-5px 0px 1px #00dcff)',
			'drop-shadow(-5px 0px 1px #ff006a) drop-shadow(5px 0px 1px #00dcff)',
			'drop-shadow(5px 0px 1px #ff006a) drop-shadow(-5px 0px 1px #00dcff)',
			'drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)',
		],
		transition: {
			duration: 0.3,
			ease: [0.455, 0.03, 0.515, 0.955],
		},
	}),
	tap: {
		scale: 0.9,
		transition: {
			duration: 0.1,
			ease: [0.455, 0.03, 0.515, 0.955],
		},
	},
};

export const clickAnim = {
	init: (custom) => ({
		x: custom,
		scale: 0,
		opacity: 0,
		transition: {
			duration: 0.1,
		},
	}),
	anim: {},
	tap: (custom) => ({
		x: custom,
		opacity: 1,
		scale: 1.2,
		transition: {
			duration: 0.07,
		},
	}),
};
