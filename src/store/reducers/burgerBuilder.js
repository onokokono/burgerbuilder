import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.5,
    bacon: 1
}

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    building: false
}

const add_ingredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
};
const remove_ingredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
};
const set_ingredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
    };
};
const fetch_ingredients_failed = (state, action) => {
    return {
        ...state,
        error: true
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return add_ingredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return remove_ingredient(state, action)
        case actionTypes.SET_INGREDIENTS: return set_ingredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetch_ingredients_failed(state, action);
        default: return state;
    }
}

export default reducer;