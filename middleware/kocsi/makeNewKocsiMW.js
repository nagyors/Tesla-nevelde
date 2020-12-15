/**
	A radio buttonok szerint letrehozza az uj kocsit.
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
	const KocsiModel = requireOption(objectrepository, 'KocsiModel');
	
	return function (req, res, next) {
		if (
			typeof req.body.model === 'undefined' ||
			typeof req.body.szin === 'undefined' ||
            typeof res.locals.user === 'undefined'
        ) {
			return next();
        }
					
		if (typeof res.locals.ujKocsi === 'undefined') {
            res.locals.ujKocsi = new KocsiModel();
        }
		
		switch(req.body.model){
			case 'models':
				res.locals.ujKocsi.model = 'Model S';
				res.locals.ujKocsi.ar = 100;
				break;
			case 'model3':
				res.locals.ujKocsi.model = 'Model 3';
				res.locals.ujKocsi.ar = 30;
				break;
			case 'modelx':
				res.locals.ujKocsi.model = 'Model X';
				res.locals.ujKocsi.ar = 120;
				break;
			case 'modely':
				res.locals.ujKocsi.model = 'Model Y';
				res.locals.ujKocsi.ar = 40;
				break;
			default:
				res.locals.ujKocsi.model = 'Roadster';
				res.locals.ujKocsi.ar = 250;
		}
		
		switch(req.body.szin){
			case 'fekete':
				res.locals.ujKocsi.szin = 'Fekete';
				break;
			case 'feher':
				res.locals.ujKocsi.szin = 'Fehér';
				break;
			case 'kek':
				res.locals.ujKocsi.szin = 'Kék';
				break;
			default:
				res.locals.ujKocsi.szin = 'Piros';
		
		}
		
		res.locals.ujKocsi.allapot = '100';
		res.locals.ujKocsi.akkumlator = '100';
		res.locals.ujKocsi.tisztasag = 'Tiszta';
		res.locals.ujKocsi.elado = false;
		res.locals.ujKocsi._garazs = res.locals.user._id;
		
		if(res.locals.user.money < res.locals.ujKocsi.ar){
			res.locals.error = 'Nincs elég pénzed';
			return next();
		}
		
		res.locals.user.money -= res.locals.ujKocsi.ar;
		
		res.locals.ujKocsi.save(err => {
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