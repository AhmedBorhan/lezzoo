module.exports = (app) => {
	const passport = require('passport');
	const category = require('../controllers/category.controller');
	var router = require('./router');

	// Categories
	router.get('/all-category', passport.authenticate('jwt', { session: false }), category.getAllCategories);
	router.post('/create-category', passport.authenticate('jwt', { session: false }), category.createCategory);
	router.delete('/delete-category/:id', passport.authenticate('jwt', { session: false }), category.deleteCategory);

	app.use('/api/category', router);
};
