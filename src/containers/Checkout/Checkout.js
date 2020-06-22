import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInformation from './ContactInformation/ContactInformation';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.push(`${props.match.path}/contactInformation`);
    }

    let summary = <Redirect to='/' />
    if (props.ingredients) {
        summary = (
            <div>
                <CheckoutSummary
                    checkoutCancelled={checkoutCancelled}
                    checkoutContinued={checkoutContinued}
                    ingredients={props.ingredients} />
                <Route
                    path={`${props.match.path}/contactInformation`}
                    component={ContactInformation} />
            </div>
        )
    }
    return (summary);
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);