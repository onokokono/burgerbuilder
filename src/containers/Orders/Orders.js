import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = React.memo((props) => {
    const { onFetchOrders, token, UID } = props;

    useEffect(() => {
        onFetchOrders(token, UID);
    }, [onFetchOrders, token, UID]);

    let order = <Spinner />;

    if (!props.loading) {
        order = props.orders.map(order =>
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
});

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