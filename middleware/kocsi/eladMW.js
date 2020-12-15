/**
	Eladova tesz egy kocsit.
*/
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (
			typeof res.locals.kocsi === 'undefined'
			) {
            return next();
        }
		
		if(res.locals.kocsi.elado === false){
			res.locals.kocsi.elado = true;
		}else{
			res.locals.kocsi.elado = false;
		}
		
        res.locals.kocsi.save(err => {
            if (err) {
                return next(err);
            }
			
			return res.redirect('/garazs');
        });
    };
};