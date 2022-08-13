import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonAnim, clickAnim } from './ComicButton.anim';
import style from './ComicButton.module.css';

const randomNo = (min, max) => {
	return min + Math.floor(Math.random() * (max - min));
};

export default function ComicButton({ buttonName, hoverBtnName }) {
	const [btnName, setBtnName] = useState(buttonName);

	return (
		<motion.button
			type='button'
			className={style.btn}
			initial='init'
			animate='init'
			whileHover='hover'
			whileTap='tap'
			variants={buttonAnim}
			custom={randomNo(6, 12)}
			onMouseEnter={() => setBtnName(hoverBtnName)}
			onMouseLeave={() => setBtnName(buttonName)}
		>
			{btnName}
			<motion.div className={style.click} variants={clickAnim} custom={randomNo(-50, 50)}></motion.div>
		</motion.button>
	);
}

ComicButton.defaultProps = {
	buttonName: 'BUTTON',
	hoverBtnName: 'HOVER',
};
