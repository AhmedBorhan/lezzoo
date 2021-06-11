import axios from 'axios';
import { ADD_ITEM, GET_ITEMS, GET_MORE_ITEMS, ITEM_LOADING, DELETE_ITEM } from './actionType';

/*
 we use this function if we do not want to hold the data in reducers
 case: category items
*/
export const fetchItems = async(data) => {
	try {
		const res = await axios.get('/api/item/all-item', {
			params: data
		});
		return res.data
	} catch (error) {
		throw error;
	}
};

/*
 we use this function if we need to hold the data in reducer
 case: items page
*/
export const fetchItemsDispatch = (data) => async (dispatch) => {
	try {
		const res = await axios.get('/api/item/all-item', {
			params: data
		});
		// SET STORES, If "offset" is zero set items list
		// Trigers when  there is no data at all
		if (data.offset === 0) dispatch(getItems(res.data));
		else
			// ADD TO STORES, add more items to items list
			// Trigers when user scrolls and ask for more data
			dispatch(addMoreItem(res.data));
	} catch (error) {
		throw error;
	}
};

export const createItem = (data) => async (dispatch) => {
	try {
		const res = await axios.post('/api/item/create-item', data);
		dispatch(addItem(res.data));
	} catch (error) {
		throw error;
	}
};

export const deleteItem = (id) => async (dispatch) =>{
	try {
		await axios.delete(`/api/item/delete-item/${id}`);
		dispatch(removeItem(id));
	} catch (error) {
		throw error
	}
};

//DISPATCH ACTIONS

// Set items & items count
export const getItems = (data) => {
	return {
		type: GET_ITEMS,
		data
	};
};

// Set items & items count
export const addItem = (data) => {
	return {
		type: ADD_ITEM,
		data: data
	};
};

// Add more items
export const addMoreItem = (data) => {
	return {
		type: GET_MORE_ITEMS,
		data: data
	};
};

// Set items & items count
export const removeItem = (id) => {
	return {
		type: DELETE_ITEM,
		data: id
	};
};

// Set loading state
export const setLoading = () => {
	return {
		type: ITEM_LOADING
	};
};
