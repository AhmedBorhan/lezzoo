var fs = require('fs');
const db = require('../models');
const Store = db.store;
const Category = db.category;
const Op = db.Sequelize.Op;

// PRIVATE ADMIN
// api/store/create-store || update-store/:id
exports.createStore = async (req, res) => {
	const { name, logo } = req.body;
	const { id } = req.params;

	if (!name || !logo) {
		res.status(400).json({
			result: 'Fail',
			message: 'Name & Logo are required'
		});
	}

	try {
		// Create store
		const newStore = {
			name,
			logo: logo
		};
		console.log(`newStore`, newStore);
		// If there is id, that means the store already exist so we update it, else we create a new one
		if (!id) {
			// check of the store name is alread taken
			const duplicateName = await Store.findOne({
				where: { name }
			});
			if (duplicateName) {
				res.status(400).json({
					result: 'Fail',
					message: 'That name already exist'
				});
			}
			const data = await Store.create(newStore);
			/** 
			 * copy the uploaded file from temp directory to images directory.
			 * then remove the image from temp.
			**/
			var target_path = `uploads/images/` + logo;
			var tmp_path = `uploads/temp/` + logo;
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
				message: 'Store created successfuly',
				data
			});
		} else {
			const data = await Store.update(newStore, {
				where: { store_id: id }
			});
			// Retrun success message with the store
			return res.json({
				result: 'Success',
				message: 'Store updated successfuly',
				data
			});
		}
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: 'Some error occurred while creating store.'
		});
	}
};
// GET stores
// PATH api/store/all-stores
exports.getAllIStore = async (req, res) => {
	const { search, category, limit, offset } = req.query;
	console.log('offset :>> ', limit);
	var searchCondition = search
		? { [Op.or]: [ { title: { [Op.like]: `%${search}%` } }, { tags: { [Op.like]: `%${search}%` } } ] }
		: null;
	var categoryCondition = category && category > 0 ? { category_id: category } : null;

	try {
		const { count, rows } = await Store.findAndCountAll({
			where: {
				[Op.and]: [ searchCondition, categoryCondition ]
			},
			offset: offset ? parseInt(offset) : 0,
			limit: limit ? parseInt(limit) : 100,
			order: [ [ 'createdAt', 'DESC' ] ]
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
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while getting stores'
		});
	}
};

// Public
// api/store/all-stores/:id
exports.getStore = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!id || typeof id != 'number')
		res.status(400).json({
			result: 'Fail',
			message: 'There is something wrong with the store id'
		});
	try {
		let store = await Store.findOne({
			where: {
				[Op.and]: [ { item_id: id } ]
			},
			include: [ { model: Category, as: 'category', attributes: [ 'name' ] } ]
		});
		if (!store) {
			return res.status(404).json({
				result: 'Fail',
				message: 'there is no data'
			});
		}

		return res.json({
			result: 'Success',
			store
		});
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while getting blogs'
		});
	}
};
// Delete an store
// api/store/delete-store/:id
exports.deleteStore = async (req, res) => {
	const id = req.params.id;
	try {
		const num = await Store.destroy({
			where: { item_id: id }
		});
		if (num == 1) {
			return res.json({
				result: 'Success',
				message: 'store was deleted successfully!'
			});
		} else {
			return res.status(404).json({
				result: 'Fail',
				message: `Cannot delete store with id=${id}. Maybe store was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while deleteing a store'
		});
	}
};
