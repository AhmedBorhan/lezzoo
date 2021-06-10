const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const CategoryModel = sequelize.define(
		'categories',
		{
			category_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			store_id: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING
			},
			image: {
				type: Sequelize.STRING
			},
		},
		{
			id: false,
      createdAt: false,
      updatedAt: false
		}
	);

	return CategoryModel;
};
