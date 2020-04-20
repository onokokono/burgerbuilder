import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {

    state = {
        loading: true,
        orders: []
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data)
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key});
                };
                this.setState({ loading: false, orders: fetchedOrders, totalPrice: res.data.price });
            })
            .catch(res => {
                this.setState({ loading: false });
            })

    }

    render() {
        return (
            <div>
                {this.state.orders.map(order =>
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={order.price}
                    />)}
            </div>
        );
    }
};

export default Orders;