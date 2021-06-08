const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const Admin = db.admin;

const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
/*
	Every API that requires authorization will go through this step first
	it checks for a token, if there is a valid token & it belongs to an admin then it will proceed to the API 
*/
module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			Admin.findOne({
				where: { admin_id: jwt_payload.id },
				attributes: [ 'admin_id', 'name' ]
			})
				.then((user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err) => console.log(err));
		})
	);
};
