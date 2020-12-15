var expect = require('chai').expect;
var getUserMW = require('../../../../middleware/user/getUserMW');

describe('getUserMW middleware ', function () {
	it('should set res.locals.user with a user object from db', function (done) {
		const mw = getUserMW({
			UserModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '34'});
					cb(null, 'mockuser');
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				session:{
					userid: '34'
				}
			},
			resMock, 
			(err)=>{
				expect(err).to.be.eql(undefined);
				expect(resMock.locals).to.be.eql({ user: 'mockuser'});
				done();
			}
		);
	});
	
	it('should call next with error if there is a problem', function (done) {
		const mw = getUserMW({
			UserModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '34'});
					cb('adatbhiba', null);
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				session:{
					userid: '34'
				}
			},
			resMock, 
			(err)=>{
				expect(err).to.be.eql('adatbhiba');
				done();
			}
		);
	});
	
	it('should call next when there is no user in the db', function (done) {
		const mw = getUserMW({
			UserModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '34'});
					cb(undefined, null);
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				session:{
					userid: '34'
				}
			},
			resMock, 
			(err)=>{
				expect(err).to.be.eql(undefined);
				expect(resMock.locals).to.be.eql({});
				done();
			}
		);
	});
});