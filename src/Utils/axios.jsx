import axios from 'axios';
import config from '../config';
import store from 'store';
import Errors from './errorsHandler';

const axiosRequest = axios.create({
    baseURL: config.apiUrl
});


axiosRequest.interceptors.request.use((axiosConfig) => {
        return new Promise((resolve, reject) => {

            let token = store.get(config.user.token);
            axiosConfig.headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            resolve(axiosConfig);
        });
    },
    (err) => {
        Errors.errorSwitch(err.response.status);
    });

axiosRequest.interceptors.response.use((response) => {
    return response;
}, (error) => {
    Errors.errorSwitch(error.response.status);
    return Promise.reject(error);
});

export const setAxiosToken = (token) => {
    if (token) {
        axiosRequest.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    axiosRequest.defaults.headers.common.Authorization = null;
};

export default axiosRequest;