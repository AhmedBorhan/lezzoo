const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const StoreCategoryModel = sequelize.define(
		'store_categories',
		{
			category_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
      store_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
		},
		{
			id: false,
      createdAt: false,
      updateAt: false
		}
	);

	return StoreCategoryModel;
};
