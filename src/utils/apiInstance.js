import axios from 'axios';
import apiConfigDetails from '../config/api.config';

const { deleteCookie } = require("./storage");


export const apiConfig = { ...apiConfigDetails };
export const apiInstance = axios.create({
    baseURL: `${apiConfig.backendUrl}`,
    withCredentials: true
});

apiInstance.interceptors.request.use((config) => {
    const requestConfig = config;
    requestConfig.headers = {
        'Access-Control-Allow-Credentials': true,
    };
    // config.withCredentials = true
    return config;
});

apiInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        deleteCookie();
        window.location.href = '/login';
    }

    if (error.response && error.response.status === 403) {
        const url = `${window.location.origin + apiConfig.BASE_NAME}/login`;
        window.location.href = url;
    }
    return Promise.reject(error);
});
