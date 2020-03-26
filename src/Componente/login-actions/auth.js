import {AUTH_LOGIN, AUTH_LOGOUT} from "./types";

export function userLogin (){
    return {
        type: AUTH_LOGIN,
    }
}

export function userLogout (){
    return {
        type: AUTH_LOGOUT,
    }
}