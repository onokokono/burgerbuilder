import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInformation from './ContactInformation/ContactInformation';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let totalPrice;
        const ingredients = {};
        for (let ingredient of query.entries()) {
            if (ingredient[0] === 'totalPrice') {
                totalPrice = ingredient[1];
                continue;
            }

            ingredients[ingredient[0]] = +ingredient[1];
        };
        this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.push(`${this.props.match.path}/contactInformation`);
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                        ingredients={this.props.ingredients} />
                    <Route
                        path={`${this.props.match.path}/contactInformation`}
                        component={ContactInformation} />
                </div>
            )
        }
        return (summary);
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);