import React from 'react';
import css from './Backdrop.module.css';

const backdrop = props => {
    return (
        props.display ? <div className={css.Backdrop} onClick={props.backdropClick} ></div> : null
    );
};

export default backdrop