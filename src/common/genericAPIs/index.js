import { apiInstance } from '../../utils/apiInstance';

export const getRequestAsync = async (apiEndPoint, data = {}, responseType = 'json') => {
    try {
        const response = await apiInstance.get(apiEndPoint, { params: { ...data }, responseType });
        if (response.status === 200 && response.data) {
            return response.data;
        }
        throw response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            const error = {
                data: {},
                message: e.response.data.message || 'Something went wrong!',
                status: e.response.status || 500
            };
            throw error;
        }
        if (!e.message) {
            e.data = {};
            e.message = 'Something went wrong!';
            e.status = e.response.status || 500;
            throw e;
        }
        throw e;
    }
};

export const postRequestAsync = async (apiEndPoint, body) => {
    try {
        const response = await apiInstance.post(apiEndPoint, body);
        if (response.status === 200 && response.data) {
            return response.data;
        }
        throw response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            const error = {
                data: {},
                message: e.response.data.message || 'Something went wrong !',
                status: e.response.status || 500
            };
            throw error;
        }
        if (!e.message) {
            e.data = {};
            e.message = 'Something went wrong !';
            e.status = e.response.status || 500;
            throw e;
        }
        throw e;
    }
};

