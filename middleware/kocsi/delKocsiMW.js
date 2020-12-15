/**
	Töröl egy kocsit.
*/
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (
			typeof res.locals.kocsi === 'undefined'||
			typeof res.locals.user === 'undefined'
			) {
            return next();
        }
		
		res.locals.user.money += res.locals.kocsi.ar - 15;
		
        res.locals.kocsi.remove(err => {
            if (err) {
                return next(err);
            }
        });
		res.locals.user.save(err => {
			if(err){
				return next(err);
			}
			
			return res.redirect('/garazs');
		});
    };
};