import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createRootReducer from '../reducers';

const middlewares = [ thunkMiddleware ];

const store = createStore(
	createRootReducer(),
	{},
	compose(applyMiddleware(...middlewares))
	// compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
