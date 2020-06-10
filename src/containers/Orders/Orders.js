import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.UID);
    }

    render() {
        let order = <Spinner />;
        if (!this.props.loading) {
            order = this.props.orders.map(order =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    totalPrice={order.price}
                />);
        }

        return (
            <div>
                {order}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        UID: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, UID) => dispatch(actionCreators.fetchOrders(token, UID))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);