/**
	Elvégzi a szervíz műveletet.
*/
module.exports = function (objectrepository) {
	return function (req, res, next) {
		if (typeof res.locals.kocsi === 'undefined') {
			return next();
        }
		
		if(res.locals.user.money <10){
			res.locals.error = 'Nincs elég pénzed!';
			return res.redirect('/garazs');
		}
		
		if(res.locals.kocsi.allapot !== 100){
			res.locals.kocsi.allapot = 100;
			res.locals.user.money -= 10;
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