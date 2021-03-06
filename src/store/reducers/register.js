import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_START:
            return {
                ...state,
                error: null,
                loading: true,
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false,
            }
        case actionTypes.REGISTER_FAIL:
                return {
                    ...state,
                    error: action.error,
                    loading: false,
                }
        default:
            return  state;
    }
}

export default reducer;
