module.exports = (app) => {
	const passport = require('passport');
	const store = require('../controllers/store.controller');
	var router = require('./router');

	router.get('/all-store', passport.authenticate('jwt', { session: false }), store.getAllIStore);
	router.post('/create-store', passport.authenticate('jwt', { session: false }), store.createStore);
	router.post('/update-store/:id', passport.authenticate('jwt', { session: false }), store.createStore);
	router.delete('/delete-store/:id', passport.authenticate('jwt', { session: false }), store.deleteStore);


	app.use('/api/store', router);
};