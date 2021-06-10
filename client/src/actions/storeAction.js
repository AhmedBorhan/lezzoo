import axios from 'axios';

export const fetchStores = async (data) => {
	try {
		const res = await axios.get('/api/store/all-store',{
			params:data
		});
		return res.data;
	} catch (error) {
		console.log('there is an error', error);
		throw error
	}
};

export const fetchOneStore = async (id, data) => {
	try {
		const res = await axios.get(`/api/store/all-store/${id}`,{
			params:data
		});
		return res.data;
	} catch (error) {
		console.log('there is an error', error);
		throw error
	}
};

export const createStore = async (data) => {
	try {
		const res = await axios.post('/api/store/create-store', data);
		return res.data;
	} catch (error) {
		throw error;
	}
};


export const deleteStore = async (id) => {
	try {
		const res = await axios.delete(`/api/store/delete-store/${id}`);
		return res.data;
	} catch (error) {
		throw new Error('Could not delete store');
	}
};