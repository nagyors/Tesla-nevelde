/**
	Megnézi, hogy jó-e az email és a jelszó.
*/
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
	const UserModel = requireOption(objectrepository, 'UserModel');
    return function(req, res, next) {
		if (
			typeof req.body.email === 'undefined' ||
			typeof req.body.password === 'undefined'
			) {
            return next();
        }
		UserModel.findOne({
			email: req.body.email
		}, function (err, result) {
			if ((err) || (!result)) {
				res.locals.error = 'Az email címed nincs regisztrálva!';
				return next();
			}

			if (result.password !== req.body.password) {
				res.locals.error = 'Hibás jelszó!';
				return next();
			}
			
			req.session.userid = result._id;
			return res.redirect('/');
		});
    };
};