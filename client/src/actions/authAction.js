// Import actionType constants
import axios from 'axios';
import { LOG_IN_SUCCESS, LOG_OUT_SUCCESS, LOG_IN_LOADING, SET_ERRORS } from './actionType';
import decoder from 'jwt-decode';

export const loginUser = (userData) =>  async(dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.post('/api/admin/login', userData);
		const { token } = res.data;
		setAuthToken(token);
		const decode = decoder(token);
		localStorage.setItem('token', token)
		dispatch(loginSuccess(decode));
	} catch (error) {
		dispatch({
			type: SET_ERRORS,
			payload: error.response.data
		});
		throw error;
	}
};

export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem('token');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(logoutSuccess({}));
};

export const setAuthToken = (token) => {
	if (token) {
		// Apply to every request
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
};

// Set current user
export const loginSuccess = (data) => {
	return {
		type: LOG_IN_SUCCESS,
		data
	};
};

// Set current user to null
export const logoutSuccess = () => {
	return {
		type: LOG_OUT_SUCCESS
	};
};

// Set loading state
export const setLoading = () => {
	return {
		type: LOG_IN_LOADING
	};
};
