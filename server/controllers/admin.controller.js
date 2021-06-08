const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const { secretOrKey, saltOrRounds } = require('../config/keys');
const Admin = db.admin;
const { registerValidation, loginValidation, updateValidation } = require('../validation/admin.validation');

// admin login
// api/admin/login
exports.login = async (req, res) => {
	const { name, password } = req.body;
	const { isValid, error } = loginValidation({ name, password });
	if (!isValid) {
		return res.status(400).json({
			result: 'Fail',
			message: error
		});
	}
	try {
		const data = await Admin.findOne({
			where: { name: name, suspended: false }
		});
		if (!data) {
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'Wrong username or password',
					ku: 'وشەی بەکارهێنەر یاخوود ناوەکەت هەڵەیە',
					ar: 'اسم المستخدم أو كلمة المرور خاطئة'
				}
			});
		}

		const hashResult = await bcrypt.compare(password, data.password);
		console.log('hashResult', hashResult);

		if (!hashResult || hashResult === false) {
			console.log('hashResult', hashResult);
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'Wrong username or password'
				}
			});
		}
		const payload = {
			name: data.name,
			id: data.admin_id,
			privileges: JSON.parse(data.privileges)
		};
		jwt.sign(payload, secretOrKey, {}, (err, token) => {
			if (err) {
				console.log('jwt err', err);
				return res.status(500).json({
					result: 'Fail',
					message: {
						en: 'JWT error' + err
					}
				});
			}
			res.json({
				result: 'Success',
				data:payload,
				token: 'bearer ' + token
			});
		});
	} catch (error) {
		console.log('THIS IS THE AUTH ERROR', error);
		res.status(500).send({
			message: 'Some error occured while trying to login'
		});
	}
};

// PRIVATE ADMIN
// api/admin/create
exports.createAdmin = async (req, res) => {
	const { password, password2, name, privileges } = req.body;

	const { isValid, error } = registerValidation({ name, privileges, password, password2 });
	if (!isValid) {
		return res.status(400).json({
			result: 'Fail',
			message: error
		});
	}
	//check if the user has permission to proceed & the data is valid
	if (!req.user.privileges.includes('ADMIN') || privileges.includes('SUPER'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	//hash the password
	try {
		//check if name already exist
		const userExist = await Admin.findOne({
			where: {
				name
			}
		});
		if (userExist)
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'Admin already exist'
				}
			});

		const hash = await bcrypt.hash(password, parseInt(saltOrRounds));
		// Create an admin
		const newUser = {
			password: hash,
			name,
			privileges: JSON.stringify(privileges)
		};
		// Save Admin in the database
		const data = await Admin.create(newUser);
		return res.json({
			result: 'Success',
			message: { en: 'Admin created successfuly' },
			data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).send({
			message: 'Some error occurred while creating user.'
		});
	}
};

// get all system users
// api/admin/all [private]
exports.getAllAdmins = async (req, res) => {
	if (!req.user.privileges.includes('ADMIN') && !req.user.privileges.includes('SUPER'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	try {
		let data = await Admin.findAll({
			attributes: [ 'name', 'createdAt', 'updatedAt', 'privileges', 'admin_id', 'suspended' ]
		});
		if (!data) {
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'there is no data'
				}
			});
		}
		//exclude admins with super privelege
		data = data.filter((data) => !data.privileges.includes('SUPER'));
		//parse the privileges
		data.forEach((admin) => {
			admin.privileges = JSON.parse(admin.privileges);
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

// PRIVATE "ADMIN"
// Grand ord Revoke permission to/from user, suspend user
// Path POST /api/admin/update
exports.updateUser = async (req, res) => {
	const { admin_id, privileges, suspended } = req.body;

	const { isValid, error } = updateValidation({ admin_id, privileges, suspended });
	if (!isValid) {
		return res.status(400).json({
			result: 'Fail',
			message: error
		});
	}

	//check if the admin has permission
	if (!req.user.privileges.includes('ADMIN') || privileges.includes('SUPER'))
		return res.status(403).json({
			result: 'Fail',
			message: {
				en: 'Unauthorized'
			}
		});
	try {
		//check if the altered-user is not super
		const alteredUser = await Admin.findByPk(admin_id);
		if (!alteredUser)
			return res.status(404).json({
				result: 'Fail',
				message: {
					en: 'User does not exist'
				}
			});
		if (alteredUser.privileges.includes('SUPER'))
			return res.status(403).json({
				result: 'Fail',
				message: {
					en: 'Unauthorized'
				}
			});
		// add the privilege to the user
		const data = await Admin.update(
			{
				privileges: JSON.stringify(privileges),
				suspended
			},
			{
				where: {
					admin_id: admin_id
				}
			}
		);
		res.json({
			result: 'Success',
			message: { en: 'Admin updated successfuly' },
			data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while trying to change permissions'
			}
		});
	}
};

// change password
// Path POST /api/admin/change-password
exports.changePassword = async (req, res) => {
	const { old_password, new_password } = req.body;
	if (!old_password || !new_password) {
		return res.status(400).json({
			result: 'Fail',
			message: { en: 'old password and new password are required' }
		});
	}
	try {
		//check if the user exist & is not verified
		const data = await Admin.findByPk(req.user.admin_id, {
			attributes: [ 'admin_id', 'privileges', 'password' ]
		});

		const hashResult = await bcrypt.compare(old_password, data.password);
		if (!hashResult)
			return res.status(400).json({
				result: 'Fail',
				message: {
					en: 'wrong password'
				}
			});
		const hashPassword = await bcrypt.hash(new_password, Number(saltOrRounds));
		await Admin.update(
			{
				password: hashPassword
			},
			{
				where: {
					admin_id: req.user.admin_id
				}
			}
		);
		return res.json({
			result: 'Success',
			message: data
		});
	} catch (error) {
		console.log('This is error', error);
		res.status(500).json({
			result: 'Fail',
			message: {
				en: 'Some error occurred while trying to change password'
			}
		});
	}
};

//TODO admins
// >> change password, forgot password
// >> refresh token
