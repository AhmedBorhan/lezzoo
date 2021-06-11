import axios from 'axios';
import { ADD_STORE, GET_STORES, GET_MORE_STORES, STORE_LOADING, DELETE_STORE } from './actionType';

export const fetchStores = (data) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get('/api/store/all-store', {
			params: data
		});
		dispatch(getStores(res.data));
	} catch (error) {
		throw error;
	}
};

export const fetchOneStore = async (id, data) => {
	try {
		const res = await axios.get(`/api/store/all-store/${id}`, {
			params: data
		});
		return res.data;
	} catch (error) {
		console.log('there is an error', error);
		throw error;
	}
};

export const createStore = (data) => async (dispatch) => {
	try {
		const res = await axios.post('/api/store/create-store', data);
		dispatch(removeStore(res.data));
	} catch (error) {
		throw error;
	}
};

export const deleteStore = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/store/delete-store/${id}`);
		dispatch(removeStore(id));
	} catch (error) {
		throw new Error('Could not delete store');
	}
};

//DISPATCH ACTIONS

// Set stores & stores count
export const getStores = (data) => {
	return {
		type: GET_STORES,
		data
	};
};

// Set stores & stores count
export const addStore = (data) => {
	return {
		type: ADD_STORE,
		data: data
	};
};

// Set stores & stores count
export const removeStore = (id) => {
	return {
		type: DELETE_STORE,
		data: id
	};
};

// Set loading state
export const setLoading = () => {
	return {
		type: STORE_LOADING
	};
};
