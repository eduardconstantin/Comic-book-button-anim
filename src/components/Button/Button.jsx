import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonAnim, buttonAnim2, clickAnim } from './Button.anim';
import style from './Button.module.css';

export default function Button({ buttonName }) {
	const [btnName, setBtnName] = useState(buttonName);

	return (
		<div className={style.buttonContainer}>
			<motion.button
				type='button'
				className={style.btn}
				initial='init'
				animate='init'
				whileHover='hover'
				whileTap='tap'
				variants={buttonAnim}
				custom={6 + Math.floor(Math.random() * (12 - 6))}
				onMouseEnter={() => setBtnName('HOVER')}
				onMouseLeave={() => setBtnName(buttonName)}
			>
				{btnName}
				<motion.div className={style.click} variants={clickAnim} custom={50 - Math.floor(Math.random() * 100)}></motion.div>
			</motion.button>
		</div>
	);
}

Button.defaultProps = {
	buttonName: 'BUTTON',
};
