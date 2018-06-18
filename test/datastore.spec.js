const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const datastore = require('../src/datastore')
const VALID_PATH = process.cwd() + path.sep + 'xchange.db'
const INVALID_PATH = 'X:' + path.sep + 'xchange.db'

describe('Datastore Module', function() {

  it('should exist', function() {
    expect(datastore).to.not.be.an('undefined')
  })

  it('should contain an init function', function() {
    expect(datastore.init).to.be.a('function')
  })

  it('should contain an init function', function() {
    expect(datastore.init).to.be.a('function')
  })

  describe('#init()', function() {
    it('should return a promise', function(done) {
      let promise = datastore.init(VALID_PATH).then(() => {
        fs.unlink(VALID_PATH, () => {
          //do nothing
        })
      }).catch(error => {
        //do nothing
      })
      expect(promise).to.be.a('promise')
      done()
    })

    it('should throw an error if db creation failed', function(done) {
      datastore.init(INVALID_PATH).then(db => {
        done(new Error('Bad resolve on init(). Should have thrown error'))
      }).catch(error => {
        expect(error).to.be.an('error')
        done()
      })
    })

    it('should create xchange.db at the given path', function(done) {
      let promise = datastore.init(VALID_PATH).then(() => {
        fs.stat(VALID_PATH, function(err, stats){
          if(err) {
            done(err)
          } else {
            done()
          }
        })
      }).catch(error => {
        done(error)
      })
    })

  })


})