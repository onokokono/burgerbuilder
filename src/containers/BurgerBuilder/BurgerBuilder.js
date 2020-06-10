import React, { Component } from 'react';
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

export class BurgerBuilder extends Component {

    state = {
        purchasable: true,
        purshasing: false,
        loading: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasableState = ingredients => {
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

    orderNowHadler = () => {
        if (this.props.isAuth)
            this.setState({ purshasing: true });
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCanceledHandler = () => {
        this.setState({ purshasing: false });
    }

    purchaseContinuedHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = <Spinner />;
        let burger = this.props.error ? <p>Ingredients cannot be loader!</p> : <Spinner />

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                totalPrice={this.props.totalPrice}
                purchaseContinued={this.purchaseContinuedHandler}
                purchaseCanceled={this.purchaseCanceledHandler}
                ingredients={this.props.ingredients} />

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        isAuth={this.props.isAuth}
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabledInfo={disabledInfo}
                        totalPrice={this.props.totalPrice}
                        purchasable={this.updatePurchasableState(this.props.ingredients)}
                        ordering={this.orderNowHadler}
                    />
                </Aux>
            )
        }

        if (this.state.loading) orderSummary = <Spinner />

        return (
            <Aux>
                <Modal display={this.state.purshasing} backdropClick={this.purchaseCanceledHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
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