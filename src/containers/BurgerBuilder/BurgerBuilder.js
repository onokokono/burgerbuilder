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
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 4,
        purchasable: true,
        purshasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        /*  axios.get('/ingredients.json')
             .then(response => {
                 this.setState({ ingredients: response.data })
             })
             .catch(error => {
                 this.setState({ error: error.message });
             }); */
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
        this.setState({ purshasing: true });
    }

    purchaseCanceledHandler = () => {
        this.setState({ purshasing: false });
    }

    purchaseContinuedHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0;

        let orderSummary = <Spinner />;
        let burger = <Spinner />

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

        if (this.state.error) burger = <p> Something went wrong! </p>
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
        onIngredientRemove: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));