import React from 'react';
import css from './Input.module.css';

const input = props => {
    let inputElement = null;

    let inputClasses = [css.InputElement];
    if (props.isValid && props.shouldValidate && props.isTouched)
        inputClasses.push(css.Invalid);

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                onChange={props.onChange}
                {...props.elementConfig}
                value={props.value} />
            break;

        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                onChange={props.onChange}
                {...props.elementConfig}
                value={props.value} />
            break;

        case ('select'):
            inputElement = <select
                onChange={props.onChange}
                value={props.value}
                className={inputClasses.join(' ')}>
                {props.elementConfig.options.map(option => {
                    return <option key={option.value} value={option.value} > {option.displayValue} </option>
                })}
            </select>
            break;

        default:
            inputElement = <input
                className={css.InputElement}
                onChange={props.onChange}
                {...props.elementConfig}
                value={props.value} />
    }

    return (
        <div className={css.Input} >
            <label className={css.Label} > {props.label} </label>
            {inputElement}
        </div>
    );

};

export default input;