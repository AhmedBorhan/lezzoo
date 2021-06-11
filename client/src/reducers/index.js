import { combineReducers } from 'redux';

// Import custom components
import authReducer from './authReducer';
import storeReducer from './storeReducer';
import errorReducer from './errorReducer';

const appReducer = () =>
	combineReducers({
		auth: authReducer,
		errors: errorReducer,
		store: storeReducer
	});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
