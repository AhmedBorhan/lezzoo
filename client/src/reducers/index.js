import { combineReducers } from 'redux';

// Import custom components
import authReducer from './authReducer';
import storeReducer from './storeReducer';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';

const appReducer = () =>
	combineReducers({
		auth: authReducer,
		errors: errorReducer,
		store: storeReducer,
		item: itemReducer,
	});

const rootReducer = (state, action) => {
	return appReducer(state, action);
};

export default rootReducer;
