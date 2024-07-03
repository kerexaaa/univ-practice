import React from 'react'
import styles from './Button.module.css'

const Button = ({ onClickEvent, children}) => {
  return (
    <button className={styles.button} onClick={onClickEvent}>{children}</button>
  )
}

export default Button