const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const StoreModel = sequelize.define(
		'stores',
		{
			store_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING
			},
			logo: {
				type: Sequelize.STRING
			},
		},
		{
			id: false,
		}
	);

	return StoreModel;
};
