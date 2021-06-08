const Sequelize = require('sequelize');
module.exports = (sequelize) => {
	const ItemModel = sequelize.define(
		'items',
		{
			item_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
      store_id: {
				type: Sequelize.INTEGER,
			},
      category_id: {
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING
			},
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN
      },
			image: {
				type: Sequelize.STRING
			},
		},
		{
			id: false,
		}
	);

	return ItemModel;
};
