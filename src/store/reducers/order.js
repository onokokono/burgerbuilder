import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared//utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { orderId: action.orderId })
    return updateObject(
        state,
        { loading: false, orders: state.orders.concat(newOrder), purchased: true })
}
const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false });
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}
const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.fetchedOrders, loading: false });
}
const fetchOrdersFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);
        case actionTypes.PURCHASE_BURGER_START: purchaseBurgerStart(state, action); break;
        case actionTypes.PURCHASE_UNIT: return purchaseInit(state, action);
        //? Fetching orders begin
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state,action);
        //? Fetching orders end
        default: return state;
    }
};

export default orderReducer;