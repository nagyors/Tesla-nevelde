/**
	Elvégzi a töltést.
*/
module.exports = function (objectrepository) {
	return function (req, res, next) {
		if (typeof res.locals.kocsi === 'undefined') {
            return res.redirect('/garazs');
        }
		
		if(res.locals.user.money <5){
			res.locals.error = 'Nincs elég pénzed!';
			return res.redirect('/garazs');
		}
		
		if(res.locals.kocsi.akkumlator < 100){
			res.locals.kocsi.akkumlator=100;
			res.locals.user.money -= 5;
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