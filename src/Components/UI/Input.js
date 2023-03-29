import React from 'react';
import classes from './Input.module.css';

// for geeting refs passed inside custom components wrap it with forward red

const Input = React.forwardRef((props,ref) => {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref = {ref} {...props.input} />
    </div>
  )
});

export default Input; 