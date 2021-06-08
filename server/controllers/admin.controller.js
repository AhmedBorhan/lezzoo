const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const { secretOrKey } = require('../config/keys');
const Admin = db.admin;

<<<<<<< HEAD
// Admin login
// PATH api/admin/login
exports.login = async (req, res) => {
	const { name, password } = req.body;
=======
// admin login
// PATH api/admin/login
exports.login = async (req, res) => {
	const { name, password } = req.body;
	/*
		Server side validation should be added here
	*/
	// check if the username exist in the database
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
	try {
		const data = await Admin.findOne({
			where: { name: name }
		});
		if (!data) {
			return res.status(400).json({
				result: 'Fail',
<<<<<<< HEAD
				message: 'Wrong username or password'
=======
				message: 'Wrong username',
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
			});
		}
		
		// if user exist, then compare the passwords
		const hashResult = await bcrypt.compare(password, data.password);
<<<<<<< HEAD

=======
		console.log('data :>> ', data);
		console.log('body :>> ', req.body);
		console.log('data.password :>> ', data.password);
		console.log('password :>> ', password);
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
		if (!hashResult || hashResult === false) {
			return res.status(400).json({
				result: 'Fail',
<<<<<<< HEAD
				message: 'Wrong username or password'
=======
				message: 'Wrong password'
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
			});
		}
		const payload = {
			name: data.name,
<<<<<<< HEAD
			id: data.admin_id
=======
			id: data.admin_id,
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
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
<<<<<<< HEAD
=======
		/*
			Server side errors should be added to a log file(error log)
		*/
		console.log('error :>> ', error);
>>>>>>> e19cf4dcfa83fc1c32dc52e4d4d9d2ba9d74b372
		res.status(500).send({
			message: 'Some error occured while trying to login'
		});
	}
};
