const expect = require('chai').expect
const path = require('path')
const datastore = require('../src/datastore')

describe('Datastore Module', function() {

  it('should exist', function() {
    expect(datastore).to.not.be.an('undefined')
  })

  it('should contain an init function', function() {
    expect(datastore.init).to.be.a('function')
  })

  describe('#init()', function() {
    it('should return a promise', function(done) {
      let promise = datastore.init(process.cwd() + path.sep + 'xchange.db')
      expect(promise).to.be.a('promise')
      done()
    })

    it('should throw an error if db creation failed', function(done) {
      datastore.init('X:' + path.sep + 'xchange.db').then(db => {
        done(new Error('Bad resolve on init(). Should have thrown error'))
      }).catch(error => {
        expect(error).to.be.an('error')
        done()
      })
    })
  })


})