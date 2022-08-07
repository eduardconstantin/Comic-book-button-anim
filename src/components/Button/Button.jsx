import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { buttonAnim, buttonAnim2, clickAnim } from './Button.anim';
import style from './Button.module.css';

export default function Button() {
	const [btnName, setBtnName] = useState('BUTTON');

	const btnClick = () => {
		setBtnName('PRESSED');
		setTimeout(() => {
			setBtnName('BUTTON');
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
				onMouseLeave={() => setBtnName('BUTTON')}
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
