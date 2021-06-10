module.exports = (app) => {
	const passport = require('passport');
	const item = require('../controllers/item.controller');
	var router = require('./router');

	router.get('/all-item', passport.authenticate('jwt', { session: false }), item.getAllItems);
	router.post('/create-item', passport.authenticate('jwt', { session: false }), item.createItem);
	router.post('/update-item/:id', passport.authenticate('jwt', { session: false }), item.createItem);
	router.delete('/delete-item/:id', passport.authenticate('jwt', { session: false }), item.deleteItem);

	app.use('/api/item', router);
};