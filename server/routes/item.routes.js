module.exports = (app) => {
	const item = require('../controllers/item.controller');
	var router = require('./router');

	router.get('/all-item', passport.authenticate('jwt', { session: false }), item.getAllIStore);
	router.post('/create-item', passport.authenticate('jwt', { session: false }), item.createStore);
	router.post('/update-item/:id', passport.authenticate('jwt', { session: false }), item.createStore);
	router.delete('/delete-item/:id', passport.authenticate('jwt', { session: false }), item.deleteStore);

	app.use('/api/item', router);
};