import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}> {igKey}:</span> {props.ingredients[igKey]}
            </li>
        });

    return (
        <Aux>
            <h3> Your order </h3>
            <p> A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total Price: {props.totalPrice.toFixed(2)} </strong> </p>
            <p> Continue to check out? </p>
            <Button type='Danger' onClick={props.purchaseCanceled} > CANCEL </Button>
            <Button type='Success' onClick={props.purchaseContinued} > CONTINUE </Button>
        </Aux>
    );
};

export default OrderSummary;