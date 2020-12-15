/**
	Elvégzi a vezetés műveletet.
*/
module.exports = function (objectrepository) {
	return function (req, res, next) {
		if (
			typeof res.locals.kocsi === 'undefined' ||
			typeof res.locals.user === 'undefined'
			) {
			return next();
        }
			
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		
		if(
			res.locals.kocsi.akkumlator !== 0 &&
			res.locals.kocsi.allapot > 10)
		{
			res.locals.kocsi.akkumlator -= '10';
			res.locals.kocsi.allapot -= getRandomInt(10);
			
			if(getRandomInt(5) === 0){
				res.locals.kocsi.tisztasag = 'Mocskos';
			}
			
			if(res.locals.kocsi.tisztasag === 'Mocskos'){
				res.locals.user.money += 2;
			}else{
				res.locals.user.money += 5;
			}
			
		}else{
			res.locals.error = 'Most nem tudod vezetni a kocsid.';
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