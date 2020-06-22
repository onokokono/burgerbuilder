import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildContols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [props])

    const updatePurchasableState = ingredients => {
        //Count total ingredients
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((acc, curr) => {
                return acc += curr;
            }, 0);

        return sum > 0;
    }

    const orderNowHadler = () => {
        if (props.isAuth)
            setPurchasing(true);
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCanceledHandler = () => {
        setPurchasing(true);
    }

    const purchaseContinuedHandler = () => {
        props.history.push('/checkout');
        props.onInitPurchase();
    }

    const disabledInfo = { ...props.ingredients };
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <= 0;

    let orderSummary = <Spinner />;
    let burger = props.error ? <p>Ingredients cannot be loader!</p> : <Spinner />

    if (props.ingredients) {
        orderSummary = <OrderSummary
            totalPrice={props.totalPrice}
            purchaseContinued={purchaseContinuedHandler}
            purchaseCanceled={purchaseCanceledHandler}
            ingredients={props.ingredients} />

        burger = (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    isAuth={props.isAuth}
                    ingredientAdded={props.onIngredientAdd}
                    ingredientRemoved={props.onIngredientRemove}
                    disabledInfo={disabledInfo}
                    totalPrice={props.totalPrice}
                    purchasable={updatePurchasableState(props.ingredients)}
                    ordering={orderNowHadler}
                />
            </Aux>
        )
    }

    return (
        <Aux>
            <Modal display={purchasing} backdropClick={purchaseCanceledHandler} >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token ? true : false,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch(burgerBuilderActions.add_ingredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(burgerBuilderActions.remove_ingredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.set_auth_redirect_path(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));