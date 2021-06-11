const db = require('../models');
const Item = db.item;
const Category = db.category;
const Store = db.store;
const Op = db.Sequelize.Op;
var fs = require('fs');

// POST create an item
// api/create-item & update-item/:id
exports.createItem = async (req, res) => {
	const {
		category,
		store,
    price,
		state,
		image,
		name,
		id
	} = req.body;

	try {
		// Create item
		const newItem = {
			category_id: category,
			store_id: store,
			price: price,
			image,
			state,
			name,
		};
		console.log(`newItem`, newItem);
		// If there is id, that means the item already exist so we update it, else we create a new one
		if (!id) {
			const data = await Item.create(newItem);
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
				message: 'Item created successfuly',
				data
			});
		} else {
			const data = await Item.update(newItem, {
				where: { item_id: id }
			});
			return res.json({
				result: 'Success',
				message: 'Item updated successfuly',
				data: data
			});
		}
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: 'Some error occurred while creating item.'
		});
	}
};
// GET get all items
// api/all-item
exports.getAllItems = async (req, res) => {
	const { search, store, category, limit, offset } = req.query;
	console.log('category :>> ', category);
	console.log('store :>> ', store);
	var searchCondition = search
		? { [Op.or]: [ { title: { [Op.like]: `%${search}%` } }, { tags: { [Op.like]: `%${search}%` } } ] }
		: null;
	var categoryCondition = category  && category > 0 ? { category_id: category } : null;
	var storeCondition = store  && store > 0 ? { store_id: store } : null;

	try {
		const { count, rows } = await Item.findAndCountAll({
			where: {
				[Op.and]: [ searchCondition, storeCondition, categoryCondition ]
			},
			include: [
				{ model: Category, as: 'category', attributes: [ 'name' ] },
				{ model: Store, as: 'store', attributes: [ 'name' ] }
			],
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
			count
		});
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while getting items'
		});
	}
};

// GET get a single item
// api/all-item/id
exports.getItem = async (req, res) => {
	const id = parseInt(req.params.id);
	if (!id || typeof id != "number") res.status(400).json({
		result: 'Fail',
		message: 'There is something wrong with the item id'
	});
	try {
		let item = await Item.findOne({
			where: {
				[Op.and]: [{ item_id: id }]
			},
			include:[
				{ model: Category, as: 'category', attributes: [ 'name' ] },
				{ model: Store, as: 'store', attributes: [ 'name' ] }
			]
		});
		if (!item) {
			return res.status(404).json({
				result: 'Fail',
				message: 'there is no data'
			});
		}

		//parse the item titles
		item.title = JSON.parse(item.title);
		item.description = JSON.parse(item.description);
		item.sizes = JSON.parse(item.sizes);
		return res.json({
			result: 'Success',
			item,
		});
	} catch (error) {
		console.log('error :>> ', error);
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while getting items'
		});
	}
};
//
// DELETE deleting an item
// api/delete-item/:id
exports.deleteItem = async (req, res) => {

	const id = req.params.id;
	try {
		const num = await Item.destroy({
			where: { item_id: id }
		});
		if (num == 1) {
			return res.json({
				result: 'Success',
				message: 'item was deleted successfully!'
			});
		} else {
			return res.status(404).json({
				result: 'Fail',
				message: `Cannot delete item with id=${id}. Maybe item was not found!`
			});
		}
	} catch (error) {
		res.status(500).json({
			result: 'Fail',
			message: 'Some error occurred while deleteing an item'
		});
	}
};