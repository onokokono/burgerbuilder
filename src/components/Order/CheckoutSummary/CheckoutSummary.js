import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import css from './CheckoutSummary.module.css';

const checkoutSummary = props => {
    return (
        <div className={css.CheckoutSummary} >
            <h1> Please enjoy! </h1>
            <div style={{ width: '100%', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                onClick={props.checkoutCancelled}
                type="Danger" > CANCEL </Button>
            <Button 
                onClick={props.checkoutContinued}
                type="Success" > CONTINUE </Button>
        </div>
    );
}

export default checkoutSummary;