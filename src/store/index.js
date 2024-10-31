import { createStore, combineReducers } from 'redux';
import commonReducer from './common';

const rootReducer = combineReducers({
    common: commonReducer,
});

const createReduxStore = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

export default createReduxStore;
