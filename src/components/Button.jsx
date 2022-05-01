import React , {useState} from 'react'
import {motion} from 'framer-motion'
import style from '../style/button.module.css'

export default function Button() {

    const [btnName, setBtnName] = useState('BUTTON');

    const buttonAnim={
        init:{
            scale: 1,
            textShadow:"0px 0px 0px #000, 0px 0px 0px #000",
        },
        hover:{
            textShadow: ["0px 0px 0px #ff006a, 0px 0px 0px #00dcff", "-2px 0px 1px #ff006a, 2px 0px 1px #00dcff", "2px 0px 1px #ff006a, -2px 0px 1px #00dcff", "0px 0px 0px #ff006a, 0px 0px 0px #00dcff"],
            transition:{
                duration: 0.1
            }
        },
        tap:{
            scale: 0.8,
            transition:{
                duration: 0.1
            }
        }
    }
    const buttonAnim2={
        init:{
            translateX: 0,
            transition:{
                duration: 0.1
            }
        },
        hover:{
            translateX: [0, -10, 10, 0],
            filter: ["drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)", "drop-shadow(-5px 0px 1px #ff006a) drop-shadow(5px 0px 1px #00dcff)", "drop-shadow(5px 0px 1px #ff006a) drop-shadow(-5px 0px 1px #00dcff)", "drop-shadow(0px 0px 0px #ff006a) drop-shadow(0px 0px 0px #00dcff)"],
            transition:{
                duration: 0.1
            }
        },
        tap:{
            translateX: 0,
            transition:{
                duration: 0.1
            }
        }
    }

    const clickAnim={
        init:{
            display: "none",
            opacity: 0,
            transition:{
                duration: 0.05
            }
        },
        anim:{
        },
        tap:{
            display: "block",
            opacity: 1,
            transition:{
                duration: 0.05
            }
        }
    }

    const btnClick = () =>{
        setBtnName("PRESSED");
        setTimeout(() => {
            setBtnName("BUTTON");
        }, 150);
    }

  return (
    <div className={style.buttonContainer}>
            <motion.button 
            type='button' 
            className={style.btn} 
            variants={buttonAnim}
            initial="init"
            whileHover="hover"
            whileTap="tap"
            onClick={() => btnClick()}
            onMouseEnter={() => setBtnName("HOVER")}
            onMouseLeave={() => setBtnName("BUTTON")}>
                {btnName}
                <motion.div className={style.btnWrapper} variants={buttonAnim2}></motion.div>
                <motion.div className={style.click} variants={clickAnim} animate={btnName==="PRESSED"?"tap":"init"}></motion.div>
            </motion.button>
    </div>
  )
}
