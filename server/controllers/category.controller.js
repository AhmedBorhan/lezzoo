const db = require('../models');
const Category = db.category;
var fs = require('fs');

// PRIVATE ADMIN
// api/create-category
exports.createCategory = async (req, res) => {
	const { name, image, store } = req.body;
	const { id } = req.params;

	if (!name || !image) {
		res.status(400).json({
			result: 'Fail',
			message: 'Name & Image are required'
		});
	}

	try {
		// Create category
		const newCategory = {
			name,
			image: image,
			store_id: store,
		};
		console.log(`newCategory`, newCategory);
		// If there is id, that means the category already exist so we update it, else we create a new one
		if (!id) {
			// check of the category name is alread taken
			const duplicateName = await Category.findOne({
				where: { name }
			});
			if (duplicateName) {
				res.status(400).json({
					result: 'Fail',
					message: 'That name already exist'
				});
			}
			const data = await Category.create(newCategory);
			/** 
			 * copy the uploaded file from temp directory to images directory.
			 * then remove the image from temp.
			**/
			var target_path = `uploads/images/` + image;
			var tmp_path = `uploads/temp/` + image;
			console.log('tmp_path :>> ', tmp_path);
			var src = fs.createReadStream(tmp_path);
			var destPath = fs.createWriteStream(target_path);
			src.pipe(destPath);
			src.on('error', (err) => {
				// log error to error log file
				console.log('err', err);
			});
			// Remove image from temp directory
			fs.unlinkSync(tmp_path);
			return res.json({
				result: 'Success',
				message: 'Category created successfuly',
				data
			});
		} else {
			const data = await Category.update(newCategory, {
				where: { category_id: id }
			});
			// Retrun success message with the category
			return res.json({
				result: 'Success',
				message: 'Category updated successfuly',
				data
			});
		}
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).send({
			message: 'Some error occurred while creating category.'
		});
	}
};
// GET categories
// api/all-category
exports.getAllCategories = async (req, res) => {
	const { store } = req.query;

	var storeCondition = store && store > 0 ? { store_id: store } : null;

	try {
		const { count, rows } = await Category.findAndCountAll({
			where: {
				[Op.and]: [ storeCondition ]
			},
		});
		if (!rows) {
			return res.status(404).json({
				result: 'Fail',
				message: 'there is no data'
			});
		}

		return res.json({
			result: 'Success',
			data: rows,
			count,
		});
	} catch (error) {
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while getting categories'
		});
	}
};
// DELETE a single category
// api/delete-category/:id
exports.deleteCategory = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Category.destroy({
			where: { category_id: id }
		});
		if (num == 1) {
			return res.json({
				result: 'Success',
				message: 'category was deleted successfully!'
			});
		} else {
			return res.status(404).json({
				result: 'Fail',
				message: `Cannot delete category with id=${id}. Maybe category was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while deleteing a category'
		});
	}
};
