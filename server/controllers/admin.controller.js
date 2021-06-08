const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const { secretOrKey } = require('../config/keys');
const Admin = db.admin;

// Admin login
// PATH api/admin/login
exports.login = async (req, res) => {
	const { name, password } = req.body;
	try {
		const data = await Admin.findOne({
			where: { name: name }
		});
		if (!data) {
			return res.status(400).json({
				result: 'Fail',
				message: 'Wrong username or password'
			});
		}

		const hashResult = await bcrypt.compare(password, data.password);

		if (!hashResult || hashResult === false) {
			console.log('hashResult', hashResult);
			return res.status(400).json({
				result: 'Fail',
				message: 'Wrong username or password'
			});
		}
		const payload = {
			name: data.name,
			id: data.admin_id
		};
		jwt.sign(payload, secretOrKey, {}, (err, token) => {
			if (err) {
				return res.status(500).json({
					result: 'Fail',
					message: 'JWT error' + err
				});
			}
			res.json({
				result: 'Success',
				data: payload,
				token: 'bearer ' + token
			});
		});
	} catch (error) {
		res.status(500).send({
			message: 'Some error occured while trying to login'
		});
	}
};
