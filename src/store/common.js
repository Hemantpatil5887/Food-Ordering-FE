const SET_LOADER = 'SET_LOADER';
const SET_SNACKBAR = 'SET_SNACKBAR';
const SET_BADGE = "SET_BADGE";
const SET_DISPLAYNAME = "SET_DISPLAYNAME";
export const setLoader = (payload) => ({
    type: SET_LOADER,
    payload,
});

export const setSnackbar = (payload) => ({
    type: SET_SNACKBAR,
    payload,
});

export const setBadge = (payload) => ({
    type: SET_BADGE,
    payload,
});

export const setDisplayName = (payload) => ({
    type: SET_DISPLAYNAME,
    payload,
});

const initialState = {
    showLoader: 0,
    snackbar: {},
    badge: 0,
    displayName: ""
};

const commonReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case SET_LOADER:
        return { ...state, showLoader: action.payload };
    case SET_SNACKBAR:
        return { ...state, snackbar: action.payload };
    case SET_BADGE:
        return { ...state, badge: action.payload };
    case SET_DISPLAYNAME:
            return { ...state, displayName: action.payload };
    default:
        return { ...state };
    }
};

export default commonReducer;
