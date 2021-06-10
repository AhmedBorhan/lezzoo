import decoder from 'jwt-decode';
//import action types
import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS, LOG_IN_LOADING } from '../actions/actionType';

const token = localStorage.getItem('token') || null
var initialState = {
	user: token ? decoder(token) : {},
	isAuthenticated: !!token,
	isLoading: false
};

/**
 * A reducer takes two arguments, the current state and an action.
 */
const authReducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case LOG_IN_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: true,
				isLoading: false,
				user: action.data
			});
		case LOG_OUT_SUCCESS:
			return Object.assign({}, state, {
				isAuthenticated: false,
				isLoading: false,
				user: {}
			});
		case LOG_IN_LOADING:
			return Object.assign({}, state, {
				...state,
				isLoading: true
			});
		default:
			return state;
	}
};

export default authReducer;
