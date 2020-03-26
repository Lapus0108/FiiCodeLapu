import {AUTH_LOGOUT, AUTH_LOGIN} from "../login-actions/types";

const initialState = false;

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return true;
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
