/**
	Regisztrál egy felhasználót.
*/
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const UserModel = requireOption(objectrepository, 'UserModel');

    return function(req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
			typeof req.body.email === 'undefined' ||
            typeof req.body.password === 'undefined'
        ) {
            return next();
        }
		
		UserModel.findOne({
			email: req.body.email
		}, function (err, result) {
		
			if ((err) || (result !== null)) {
				res.locals.error ='Az email címed már regisztrálva van';
				return next();
			}

			if (req.body.name.length < 3) {
				res.locals.error= 'A felhasználó neved legalább 3 karakter hosszúságú legyen!';
				return next();
			}

			var newUser = new UserModel();
			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.password = req.body.password;
			newUser.money = 50;
			newUser.save(function (err) {
				if(err){
					return next(err);
				}
				return res.redirect('/');
			});
		});
    };
};