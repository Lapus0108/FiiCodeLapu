import {AUTH_LOGIN, AUTH_LOGOUT} from "./types";

export function userLogin (user){
    return {
        type: AUTH_LOGIN,
        user
    }
}

export function userLogout (){
    return {
        type: AUTH_LOGOUT,
    }
}