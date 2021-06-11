import axios from 'axios';
import { ADD_STORE, GET_STORES, GET_MORE_STORES, STORE_LOADING, DELETE_STORE } from './actionType';

export const fetchStores = (data) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await axios.get('/api/store/all-store', {
			params: data
		});
		// SET STORES, If "offset" is zero set the stores
		if(data.offset === 0) dispatch(getStores(res.data));
		// ADD TO STORES, Else add more stores
		else dispatch(addMoreStore(res.data));
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
		throw error;
	}
};

export const createStore = (data) => async (dispatch) => {
	try {
		const res = await axios.post('/api/store/create-store', data);
		dispatch(addStore(res.data));
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

// Add more stores
export const addMoreStore = (data) => {
	return {
		type: GET_MORE_STORES,
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
