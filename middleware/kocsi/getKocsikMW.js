/**
	Megszerzi az elado kocsik listajat.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	
	const KocsiModel = requireOption(objectrepository, 'KocsiModel');
	
	return function (req, res, next) {
		KocsiModel.find({ elado: true }, (err, eladoKocsik)=> {
			if(err){
				return next(err);
			}
			
			res.locals.eladoKocsik = eladoKocsik;
			return next();
		
		}).populate('_garazs');
	};

};