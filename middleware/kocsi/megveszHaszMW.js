/**
	Egy használt autót ad a garázshoz.
*/

module.exports = function (objectrepository) {
	return function (req, res, next) {
		if (typeof res.locals.kocsi === 'undefined') {
			return next();
        }
		if(
			res.locals.kocsi.ar < res.locals.user.money
		){
			res.locals.kocsi._garazs = res.locals.user._id;
			res.locals.kocsi.elado = false;
			res.locals.user.money = res.locals.user.money - res.locals.kocsi.ar;
		}

		res.locals.kocsi.save(err => {
            if (err) {
                return next(err);
            }
        });
		
		res.locals.user.save(err => {
            if (err) {
                return next(err);
            }

			return res.redirect('/garazs');
        });
	};

};