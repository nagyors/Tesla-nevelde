/**
	Megszerzi a garazsban talalhato kocsik listajat.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	
	const KocsiModel = requireOption(objectrepository, 'KocsiModel');
	
	return function (req, res, next) {
		if (typeof res.locals.user === 'undefined') {
            return next();
        }

        KocsiModel.find({ _garazs: res.locals.user._id }, (err, kocsik) => {
            if (err) {
                return next(err);
            }

            res.locals.kocsik = kocsik;
            return next();
		});
	};

};