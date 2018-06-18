const expect = require('chai').expect
const service = require('../src/service.js')

describe('Service Module', function() {

  it('should exist', function() {
    expect(service).to.not.be.an('undefined')
  })

  it('should contain a sync() function', function() {
    expect(service.sync).to.be.a('function')
  })

  describe('#sync()', function() {
    it('should return a promise', function() {
      let promise = service.sync().catch(error => console.log(error))
      expect(promise).is.a('promise')
    })

    it('should resolve with a desired response object', function(done) {
      service.sync().then(response => {
        expect(response.date).is.a('string')
        expect(response.rates).is.an('object')
        for(code in response.rates) {
          expect(code).is.a('string')
          expect(code.length).is.eq(3)
          expect(response.rates[code]).is.a('number')
        }
        done()
      }).catch(error => done(error))
    })

  })


})