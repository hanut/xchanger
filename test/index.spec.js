const expect = require('chai').expect
const XCHANGE = require('../index.js')
const testRates = {
  AUD: 1.3576009707,
  BGN: 1.6950944704,
  BRL: 3.775957705,
  CAD: 1.3330733229,
  CHF: 0.9963598544,
  CNY: 6.4982665973,
  CZK: 22.4154966199,
  DKK: 6.4586583463,
  GBP: 0.7572369561,
  HKD: 7.846073843,
  HRK: 6.3953891489,
  HUF: 282.6746403189,
  IDR: 14093.7770844167,
  ILS: 3.6241983013,
  INR: 67.9619518114,
  ISK: 109.7243889756,
  JPY: 110.5824232969,
  KRW: 1110.0624024961,
  MXN: 20.3922690241,
  MYR: 4.0155139539,
  NOK: 8.1689200901,
  NZD: 1.4600450685,
  PHP: 53.4208701681,
  PLN: 3.7490032935,
  RON: 4.0494886462,
  RUB: 63.7525567689,
  SEK: 8.9485179407,
  SGD: 1.3619344774,
  THB: 32.9303172127,
  TRY: 4.7455364881,
  USD: 1,
  ZAR: 13.6574796325,
  EUR: 0.8667013347
}

describe('Rate Caching Tests', function() {

  it('should exist', function() {
    expect(datastore).to.not.be.an('undefined')
  })

  it('should contain an getRates function', function() {
    expect(datastore.getRates).to.be.a('function')
  })

  it('should contain an updateRates function', function() {
    expect(datastore.udpateRates).to.be.a('function')
  })

  describe('#getRates()', function() {
    it('should return a promise', function(done) {
      let promise = datastore.getRates().then(() => {
        // do nothing
      }).catch(error => {
        // do nothing
      })
      expect(promise).to.be.a('promise')
      done()
    })

    it('should resolve with a list of rates', function(done) {
      datastore.getRates().then(rates => {
        done()
      }).catch(error => {
        done(error)
      })
    })
  })

  describe('#updateRates()', function() {
    it('should return a promise', function(done) {
      let promise = datastore.udpateRates().then(() => {
         // do nothing
      }).catch(error => {
        // do nothing
      })
      expect(promise).to.be.a('promise')
      done()
    })

    it('should update rate list on success', function(done) {
      let ratesData = {
        base: 'USD'
      }
      datastore.udpateRates(ratesData).then(rates => {
        done()
      }).catch(error => {
        done(error)
      })
    })
  })

})

describe('Rate Sync Tests', function() {

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