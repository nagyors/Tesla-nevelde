/**
	Megszerzi a felhasználót aki be van lepve.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	const UserModel = requireOption(objectrepository, 'UserModel');
	
	return function (req, res, next) {
		UserModel.findOne({_id: req.session.userid}, (err, user)=> {
			if(err || !user){
				return next(err);
			}
		
			res.locals.user = user;
			return next();
		
		});

	};

};