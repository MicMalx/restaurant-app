import React from 'react';

import style from './Button.module.css';

const button = props => (
    <button 
      disabled={props.disabled}
      className={[style.Button, style[props.btnType]].join(' ')}
      onClick={props.clicked}      
    >{props.children}</button>
);

export default button;