import axios from 'axios';

export const fetchItems = async (data) => {
	try {
		const res = await axios.get('/api/item/all-item',{
			params:data
		});
		return res.data;
	} catch (error) {
		console.log('there is an error', error);
		throw error
	}
};


export const createItem = async (data) => {
	try {
		const res = await axios.post('/api/item/create-item', data);
		return res.data;
	} catch (error) {
		throw error;
	}
};


export const deleteItem = async (id) => {
	try {
		const res = await axios.delete(`/api/item/delete-item/${id}`);
		return res.data;
	} catch (error) {
		throw new Error('Could not delete item');
	}
};