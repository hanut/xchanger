const expect = require('chai').expect
const XCHANGER = require('../index.js')
let xchange = new XCHANGER('inr')

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

describe('Xchager module', function() {
  it('index.js should exist', function() {
    expect(XCHANGER).to.not.be.an('undefined')
  })

  it('should be a constructor', function(done) {
    expect(XCHANGER).is.a('function')
    try {
      let tmp = new XCHANGER('inr')
      expect(tmp).is.not.an('undefined')
      done()
    } catch(error) {
      done(error)
    }
  })

  describe('#sync()', function() {
    it('should be a function that returns a promise', function() {
      expect(xchange.sync).to.be.a('function')
      let promise = xchange.sync()
      promise.catch(error => {throw Error(error)})
      expect(promise).to.be.a('promise')
    })

    it('should response with a valid response', function(done) {
      this.timeout(5000)
      xchange.sync().then(response => {
        expect(response).is.an('object')
        done()
      }).catch(error => {
        done(error)
      })
    })
  })

  describe('#saveRates()', function() {
    it('should be a function', function() {
      expect(xchange.saveRates).to.be.a('function')
    })

    it('should save the provided rates correctly', function(done) {
      xchange.saveRates(testRates).then(() => {
        xchange.loadRates().then(ratesFromFile => {
          expect(ratesFromFile.length).is.eq(testRates.length)
          expect(ratesFromFile).to.eql(testRates)
          done()
        }).catch(done)
      }).catch(done)
    })
  })

  describe('#loadRates()', function() {
    it('should be a function', function() {
      expect(xchange.loadRates).to.be.a('function')
    })

    it('should load the rates', function(done) {
      xchange.loadRates().then(() => {
        done()
      }).catch(error => {
        console.log(error)
        done(new Error(error))
      })
    })
  })

  describe('#setBase()', function() {
    it('should be a function', function(){
      expect(xchange.setBase).to.be.a('function')
    })
  })

  describe('#getBase()', function() {
    it('should be a function', function(){
      expect(xchange.getBase).to.be.a('function')
    })
  })

  describe('#getValidCodes()', function() {
    it('should be a function', function(){
      expect(xchange.getValidCodes).to.be.a('function')
    })
  })

  describe('#isValidCC()', function() {
    it('should be a function', function(){
      expect(xchange.isValidCC).to.be.a('function')
    })
  })

  describe('#getCF()', function() {
    it('should be a function', function(){
      expect(xchange.getCF).to.be.a('function')
    })

    it('should return a numeric value', function(){
      expect(xchange.getCF(1)).to.be.a('number')
    })
  })

  describe('#convert()', function() {
    xchange = new XCHANGER('inr')

    it('should be a function that returns a promise', function() {
      expect(xchange.convert).to.be.a('function')
      let promise = xchange.convert()
      promise.catch(error => {return;})
      expect(promise).to.be.a('promise')
    })
  })


})