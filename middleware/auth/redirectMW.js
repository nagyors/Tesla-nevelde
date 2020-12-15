/**
	Megnézi, hogy az a felhasználó be van-e jelentkezve és tovább viszi egy oldalra.
*/

module.exports = function (objectrepository) {

	return function (req, res, next) {

		if (typeof req.session.userid === 'undefined') {
			return res.redirect('/bejelentkezes');
		} else {
			return res.redirect('/garazs');
		}
	};
};