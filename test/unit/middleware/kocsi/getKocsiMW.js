var expect = require('chai').expect;
var getKocsiMW = require('../../../../middleware/kocsi/getKocsiMW');

describe('getKocsiMW middleware ', function () {
	it('should set res.locals.kocsi with a kocsi object from db', function (done) {
		const mw = getKocsiMW({
			KocsiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '8'});
					cb(null,'mockkocsi');
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				params:{
					kocsiid: '8'
				}
			},
			resMock, 
			(err)=>{
				expect(err).to.be.eql(undefined);
				expect(resMock.locals).to.be.eql({ kocsi: 'mockkocsi'});
				done();
			}
		);
	});
	
	it('should call next with error if there is a problem', function (done) {
		const mw = getKocsiMW({
			KocsiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '8'});
					cb('adatbhiba', null);
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				params:{
					kocsiid: '8'
				}
			},
			resMock, 
			(err)=>{
				expect(err).to.be.eql('adatbhiba');
				done();
			}
		);
	});
	
	it('should call next when there is no kocsi in the db', function (done) {
		const mw = getKocsiMW({
			KocsiModel:{
				findOne: (p1,cb)=>{
					expect(p1).to.be.eql({_id: '8'});
					cb(undefined, null);
				}
			}
		});
	
		const resMock = {
			locals: {}
		};
		
		mw(
			{
				params:{
					kocsiid: '8'
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