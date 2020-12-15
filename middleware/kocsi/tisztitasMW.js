/**
	Elvegzi a tisztitast.
*/
module.exports = function (objectrepository) {
	return function (req, res, next) {
		if (typeof res.locals.kocsi === 'undefined') {
			return next();
        }
		
		if(res.locals.user.money <1){
			res.locals.error = 'Nincs elég pénzed!';
			return res.redirect('/garazs');
		}
		
		if(res.locals.kocsi.tisztasag === 'Mocskos'){
			res.locals.kocsi.tisztasag = 'Tiszta';
			res.locals.user.money -= 1;
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