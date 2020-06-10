import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
};

//?Burger purchasing BEGIN
export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: orderId,
        orderData: orderData,
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post(`/orders.json?auth=${token}`, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error));
            })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_UNIT
    }
};
//?Burger purchasing END

//? Fetch orders START
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchedOrders: fetchedOrders
    }
};

export const fetchOrdersFailed = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED
    }
};

export const fetchOrders = (token, UID) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        const queryParam = `?auth=${token}&orderBy="UID"&equalTo="${UID}"`

        axios.get('/orders.json'+queryParam)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                };
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            })
    }
}

//? Fetch orders END