import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                error: null,
                purchased: false,
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                error: null,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder =  { ...action.orderData, id: action.orderId };
            return {
                ...state,
                error: null,
                orders: state.orders.concat( newOrder ),
                purchased: true,
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                purchased: false,
                error: action.error,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                error: action.error,
            };
        default:
            return  state;
    }
}

export default reducer;