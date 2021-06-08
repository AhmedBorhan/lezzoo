module.exports = (app) => {
	const admin = require('../controllers/admin.controller');
	var router = require('./router');

	router.post('/login', admin.login);

	app.use('/api/admin', router);
};

//TODO add multi language message errors