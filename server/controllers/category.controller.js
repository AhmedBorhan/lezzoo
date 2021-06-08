const db = require('../models');
const Category = db.category;


// PRIVATE ADMIN
// api/create-category
exports.createCategory = async (req, res) => {
	const { title_en, title_ar, title_ku, image } = req.body;

	if (!title_en) {
		return res.status(400).json({
			result: 'Fail',
			message: { en: 'English title is required' }
		});
	}
	//check if the user has permission to proceed
	if (!req.user.privileges.includes('ADMIN') && !req.user.privileges.includes('CHEF'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	try {
		// Create category
		const newCategory = {
			title: JSON.stringify({
				en: title_en,
				ar: title_ar || null,
				ku: title_ku || null
			}),
			image
		};
		// Save category
		const data = await Category.create(newCategory);
		return res.json({
			result: 'Success',
			message: { en: 'Admin created successfuly' },
			data: { ...data.dataValues, title: JSON.parse(data.dataValues.title) }
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: 'Some error occurred while creating user.'
		});
	}
};
// PRIVATE ADMIN
// api/create-category/:id
exports.updateCategory = async (req, res) => {
	const { title_en, title_ar, title_ku, image, state } = req.body;
	const { id } = req.params;

	if (!title_en || !id) {
		return res.status(400).json({
			result: 'Fail',
			message: { en: 'Category id & English title is required' }
		});
	}
	//check if the user has permission to proceed
	if (!req.user.privileges.includes('ADMIN') && !req.user.privileges.includes('CHEF'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	try {
		// Create category
		const newCategory = {
			title: JSON.stringify({
				en: title_en,
				ar: title_ar || null,
				ku: title_ku || null
			}),
			image,
			state
		};
		console.log(`newCategory`, newCategory);
		// Save category
		const data = await Category.update(newCategory, { where: { category_id: id } });
		return res.json({
			result: 'Success',
			message: { en: 'Category updated successfuly' },
			data: data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: 'Some error occurred while creating user.'
		});
	}
};
// GET categories
// api/all-category
exports.getAllCategories = async (req, res) => {
	try {
		let data = await Category.findAll();
		if (!data) {
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'there is no data'
				}
			});
		}
		//parse the titles
		data.forEach((category) => {
			category.title = JSON.parse(category.title);
		});
		return res.json({
			result: 'Success',
			data: data
		});
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while getting blogs'
			}
		});
	}
};
// DELETE a single category
// api/delete-category/:id
exports.deleteCategory = async (req, res) => {
	//check if the user has permission to proceed
	if (!req.user.privileges.includes('ADMIN') && !req.user.privileges.includes('CHEF'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});

	const id = req.params.id;
	try {
		const num = await Category.destroy({
			where: { category_id: id }
		});
		if (num == 1) {
			return res.json({
				result: 'Success',
				message: {
					en: 'category was deleted successfully!'
				}
			});
		} else {
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: `Cannot delete category with id=${id}. Maybe category was not found!`
				}
			});
		}
	} catch (error) {
		let message;
		if (error.message.includes('Cannot delete or update a parent row'))
			message = 'Cannot delete or update a parent row';
		res.status(500).json({
			result: 'Fail',
			message: {
				en: message || 'Some error occurred while deleteing a category'
			}
		});
	}
};
