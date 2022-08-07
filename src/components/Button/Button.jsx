import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonAnim, buttonAnim2, clickAnim } from './Button.anim';
import style from './Button.module.css';

export default function Button({ buttonName }) {
	const [btnName, setBtnName] = useState(buttonName);

	const btnClick = () => {
		setBtnName('PRESSED');
		setTimeout(() => {
			setBtnName(buttonName);
		}, 150);
	};

	return (
		<div className={style.buttonContainer}>
			<motion.button
				type='button'
				className={style.btn}
				variants={buttonAnim}
				initial='init'
				whileHover='hover'
				whileTap='tap'
				onClick={() => btnClick()}
				onMouseEnter={() => setBtnName('HOVER')}
				onMouseLeave={() => setBtnName(buttonName)}
			>
				{btnName}
				<motion.div className={style.btnWrapper} variants={buttonAnim2}></motion.div>
				<motion.div
					className={style.click}
					variants={clickAnim}
					animate={btnName === 'PRESSED' ? 'tap' : 'init'}
				></motion.div>
			</motion.button>
		</div>
	);
}

Button.defaultProps = {
	buttonName: 'BUTTON',
};
