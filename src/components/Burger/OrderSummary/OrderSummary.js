import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}> {igKey}:</span> {this.props.ingredients[igKey]}
                </li>
            });

        return (
            <Aux>
                <h3> Your order </h3>
                <p> A delicious burger with following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong> Total Price: {this.props.totalPrice.toFixed(2)} </strong> </p>
                <p> Continue to check out? </p>
                <Button type='Danger' onClick={this.props.purchaseCanceled} > CANCEL </Button>
                <Button type='Success' onClick={this.props.purchaseContinued} > CONTINUE </Button>
            </Aux>
        );
    }
};

export default OrderSummary;