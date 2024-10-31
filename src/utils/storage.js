export const setStorage = (key, value) => {
    localStorage.setItem(key.toLowerCase(), value);
};

export const getStorage = (key) => localStorage.getItem(key.toLowerCase());

export const removeStorage = (key) => localStorage.removeItem(key.toLowerCase());

export const getCookie = () => document.cookie.replace(/(?:(?:^|.*;\s*)central\s*\/=\s*([^;]*).*$)|^.*$/, "$1");

export const deleteCookie = (name) => {
    localStorage.clear();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = '/';
};

export const setCookie = (name, data) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `${name}=${data};expires=tomorrow`;
    return document.cookie;
};
