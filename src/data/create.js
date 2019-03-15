/**
 * Created by mengqinghui 
 * 构造redux
 */

'use strict';

import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

//import asyncMiddleware from '../lib/async-middleware'

import '../sdk/init';
import sign from './reducer/sign';
import session from './reducer/session';

const _reducers = {
    sign: sign,
    session: session,
};

const reducers = combineReducers(_reducers);
/**
 * devtool
 */

//import {persistState} from 'redux-devtools';


//export default (/*, DevTool*/) => {
    //const reduxRouterMiddleware = syncHistory(history);
 
let middlewares = [thunk];

let finalCreateStore;

finalCreateStore = applyMiddleware(...middlewares)(createStore);

const store = finalCreateStore(reducers);

    //return store;
//}

export default store;

