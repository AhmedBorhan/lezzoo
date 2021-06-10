import axios from 'axios';

export const fetchCategory = async (data) => {
	try {
		const res = await axios.get('/api/category/all-category',{
			params:data
		});
		return res.data;
	} catch (error) {
		console.log('there is an error', error);
		throw error
	}
};


export const createCategory = async (data) => {
	try {
		const res = await axios.post('/api/category/create-category', data);
		return res.data;
	} catch (error) {
		throw error;
	}
};


export const deleteCategory = async (id) => {
	try {
		const res = await axios.delete(`/api/category/delete-category/${id}`);
		return res.data;
	} catch (error) {
		throw new Error('Could not delete category');
	}
};