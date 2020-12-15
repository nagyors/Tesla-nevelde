/**
	Megszerzi a nem sajat, elado kocsikat.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	
	const KocsiModel = requireOption(objectrepository, 'KocsiModel');
	
	return function (req, res, next) {
		KocsiModel.find({elado: true}, (err, masKocsik)=> {
			if(err){
				return next(err);
			}
			
			res.locals.masKocsik = masKocsik;
			
			return next();
		}).populate('_garazs');
	};

};