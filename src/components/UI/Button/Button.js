import React from 'react';
import css from './Button.module.css';

const button = props => {
    return (
        <button
            disabled={props.disabled}
            className={[css.Button, css[props.type]].join(' ')}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default button;