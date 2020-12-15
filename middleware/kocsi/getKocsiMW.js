/**
	Azt a kocsit szerzi meg amelyikkel foglalkozunk.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	const KocsiModel = requireOption(objectrepository, 'KocsiModel');
	
	return function (req, res, next) {
		KocsiModel.findOne({ _id: req.params.kocsiid }, (err, kocsi) => {
				if(err || !kocsi){
					return next(err);
				}
				res.locals.kocsi = kocsi;
				return next();
			});
  };
};