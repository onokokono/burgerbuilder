import React from 'react';
import css from './BuildControl.module.css';

const buildControl = props => {
    return (
        <div className={css.BuildControl}>
            <div className={css.Label} > {props.label} </div>
            <button
                disabled={props.disabledInfo}
                className={css.Less}
                onClick={props.removed} > Less </button>
            <button
                className={css.More}
                onClick={props.added} > More </button>
        </div>
    );
};

export default buildControl;