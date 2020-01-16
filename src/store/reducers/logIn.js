import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case actionTypes.LOGIN_FAIL:
                return {
                    ...state,
                    error: action.error,
                    loading: false,
                }
        case actionTypes.LOGIN_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        default:
            return  state;
    }
}

export default reducer;