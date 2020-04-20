import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import css from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = props => {
    return (
        <div className={css.BuildConrols}>
            <p> <strong>Current price: {props.totalPrice.toFixed(2)}$</strong> </p>
            {controls.map((ctrl) => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={props.ingredientAdded.bind(this, ctrl.type)}
                    removed={props.ingredientRemoved.bind(this, ctrl.type)}
                    disabledInfo={props.disabledInfo[ctrl.type]}
                />
            ))}
            <button onClick={props.ordering} disabled={!props.purchasable} className={css.OrderButton}> ORDER NOW </button>
        </div>
    );
};

export default buildControls;