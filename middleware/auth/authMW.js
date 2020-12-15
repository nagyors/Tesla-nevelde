/**
	Megnézi, hogy az a felhasználó be van-e jelentkezve, ha nem visszadobja a /-re.
*/
module.exports = function (objectrepository) {

  return function (req, res, next) {
    if (typeof req.session.userid === 'undefined') {
      return res.redirect('/');
    }
    return next();
  };

};