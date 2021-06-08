const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const AdminModel = sequelize.define(
		'admins',
		{
			admin_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			password: {
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			},
		},
		{
			id: false
		}
	);

	return AdminModel;
};
