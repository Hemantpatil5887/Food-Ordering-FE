import { getStorage } from "./storage";

export const isLogin = () => {
    const accessToken = getStorage('access-token');

    if (accessToken) {
        return true;
    }

    return false;
};


export const isNumber = (n) => !Number.isNaN(parseInt(n, 10)) && Number.isFinite(n);

