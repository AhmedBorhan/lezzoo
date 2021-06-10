const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});
// Test database connection
const testDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};
testDB();
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.admin = require('./AdminModel')(sequelize);
db.store = require('./StoreModel')(sequelize);
db.category = require('./CategoryModel')(sequelize);
db.item = require('./ItemModel')(sequelize);

// Assosiation
db.store.hasMany(db.item,{ as:'items', foreignKey: 'store_id' });
db.item.belongsTo(db.store,{foreignKey: 'store_id' });

db.store.hasMany(db.category,{ as:'categories', foreignKey: 'store_id' });
db.category.belongsTo(db.store,{foreignKey: 'store_id' });

db.category.hasMany(db.item,{ as:'items', foreignKey: 'category_id' });
db.item.belongsTo(db.category,{foreignKey: 'category_id' });

// db.item.belongsTo(db.category,{foreignKey: 'category_id' });

// db.store.belongsToMany(db.category,{ through: store_category });
// db.category.belongsToMany(db.store,{ through: store_category });


module.exports = db;
