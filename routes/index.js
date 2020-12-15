const authMW = require('../middleware/auth/authMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');
const redirectMW = require('../middleware/auth/redirectMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const logoutMW = require('../middleware/auth/logoutMW');
const delKocsiMW = require('../middleware/kocsi/delKocsiMW');
const getKocsiMW = require('../middleware/kocsi/getKocsiMW');
const szervizMW = require('../middleware/kocsi/szervizMW');
const eladMW = require('../middleware/kocsi/eladMW');
const getSajatKocsikMW = require('../middleware/kocsi/getSajatKocsikMW');
const getNSKocsikMW = require('../middleware/kocsi/getNSKocsikMW');
const tisztitasMW = require('../middleware/kocsi/tisztitasMW');
const toltesMW = require('../middleware/kocsi/toltesMW');
const vezetesMW = require('../middleware/kocsi/vezetesMW');
const getUserMW = require('../middleware/user/getUserMW');
const regUserMW = require('../middleware/user/regUserMW');
const megveszHaszMW = require('../middleware/kocsi/megveszHaszMW');
const makeNewKocsiMW = require('../middleware/kocsi/makeNewKocsiMW');
const getKocsikMW = require('../middleware/kocsi/getKocsikMW');
const renderMW = require('../middleware/renderMW');

const UserModel = require('../models/user');
const KocsiModel = require('../models/kocsi');

module.exports = function (app) {
    const objRepo = {
		UserModel: UserModel,
		KocsiModel: KocsiModel
	};
		
	app.use('/garazs/uj',
        authMW(objRepo),
		getUserMW(objRepo),
		makeNewKocsiMW(objRepo),
        renderMW(objRepo, 'uj'));
	
	app.get('/garazs/hasznalt/:kocsiid',
		getKocsiMW(objRepo),
		getUserMW(objRepo),
		megveszHaszMW(objRepo)
	);
	
	app.get('/garazs/hasznalt',
        authMW(objRepo),
		getUserMW(objRepo),
		getNSKocsikMW(objRepo),
		getKocsikMW(objRepo),
        renderMW(objRepo, 'used'));
		
	app.get('/garazs/del/:kocsiid',
		getUserMW(objRepo),
		getKocsiMW(objRepo),
		delKocsiMW(objRepo)
	);
	
	app.get('/garazs/elad/:kocsiid',
		getKocsiMW(objRepo),
		eladMW(objRepo)
	);
	
	app.get('/garazs/tolt/:kocsiid',
		getUserMW(objRepo),
		getKocsiMW(objRepo),
		toltesMW(objRepo)
	);
	
	app.get('/garazs/szerviz/:kocsiid',
		getUserMW(objRepo),
		getKocsiMW(objRepo),
		szervizMW(objRepo)
	);
	
	app.get('/garazs/vezet/:kocsiid',
		getUserMW(objRepo),
		getKocsiMW(objRepo),
		vezetesMW(objRepo)
	);
	
	app.get('/garazs/tisztit/:kocsiid',
		getUserMW(objRepo),
		getKocsiMW(objRepo),
		tisztitasMW(objRepo)
	);
	
	app.get('/garazs',
        authMW(objRepo),
		getUserMW(objRepo),
        getSajatKocsikMW(objRepo),
		renderMW(objRepo, 'main'));
		
	app.use('/regisztracio',
		regUserMW(objRepo),
        renderMW(objRepo, 'reg'));
		
	app.use('/kijelentkezes',
		logoutMW(objRepo));
	
	app.use('/bejelentkezes',
		inverseAuthMW(objRepo),
		checkPassMW(objRepo),
        renderMW(objRepo, 'index'));
	
	
	app.get('/', redirectMW(objRepo));

};