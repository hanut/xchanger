const fs = require('fs')
const path = require('path')
const needle = require('needle')
const _ = require('lodash')
const STORAGE_PATH = path.join(__dirname, 'xchange.store')
const API_URL = 'https://exchangeratesapi.io/api/latest'
const VALID_BASE_CODES = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"]


const XCHANGE = function(base) {
  base = base.toUpperCase()
  if(VALID_BASE_CODES.indexOf(base) === -1) {
    console.log('invalid base code. initialising with USD')
    base = 'USD'
  }
  this.rates = undefined
  this.base = base
  this.updatedAt = new Date()
  this.firstSyncDone = false
}

XCHANGE.prototype.sync = async function(base) {
  if(base) {
    base = base.toUpperCase()
    if(VALID_BASE_CODES.indexOf(base) === -1) {
      invalidError()
    }
  } else {
    base = this.base
  }
  return new Promise((resolve, reject) => {
    needle('get', API_URL + "?base="+base, {compressed: true}).then(response => {
      try{
        let rates = response.body.rates
        this.updatedAt = new Date()
        resolve(rates)
      } catch(error) {
        reject(error)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

XCHANGE.prototype.saveRates = function(rates) {
  return new Promise((resolve, reject) => {
    fs.writeFile(STORAGE_PATH, JSON.stringify(rates), (error) => {
      if(error) {
        return reject(error)
      }
      resolve()
    })
  })
}

XCHANGE.prototype.loadRates = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(STORAGE_PATH, (err, rawData) => {
      if(err) {
        return reject(err)
      }
      try {
        let ratesData = JSON.parse(rawData)
        resolve(ratesData)
      } catch(error) {
        reject(error)
      }
    })
  })
}

XCHANGE.prototype.setBase = function(base) {
  base = base.toUpperCase()
  if(VALID_BASE_CODES.indexOf(base) === -1) {
    throw new Error('invalid base code')
  }
  this.base = base
}

XCHANGE.prototype.getBase = function(base) {
  return this.base
}

XCHANGE.prototype.getValidCodes = function() {
  return VALID_BASE_CODES
}

XCHANGE.prototype.isValidCC = function(code) {
  if(!code) {
    return false
  }
  if(code.length !== 3) {
    return false
  }
  code = code.toString().toUpperCase()
  return VALID_BASE_CODES.indexOf(code) === -1 ? false : true
}


XCHANGE.prototype.getCF = function(to, from){
  if(to === from) {
    return 1
  }
  if(from === this.base) {
    return this.rates[to]
  }
  return this.rates[from]/this.rates[to]
}

XCHANGE.prototype.convert = async function(amount, from, to) {
  try {
    if(!amount) {
      throw new Error('missing argument 1: `amount`')
    } else if(isNaN(amount)) {
      throw new Error('invalid argument 1: expected `amount` to be a number')
    }
    if(!this.isValidCC(from)) {
      throw new Error('invalid/missing argument 2: `from` is either not a valid country code or is not provided')
    }
    if(!to) {
      to = this.base
    }
    if(!this.isValidCC(to)) {
      throw new Error('invalid/missing argument 3: `to` is not a valid country code')
    }
    to = to.toString().toUpperCase()
    from = from.toString().toUpperCase()
    let timeDiff = new Date() - this.updatedAt
    let ratesExpired = ( timeDiff > 5000 ) ? true : false
    if(!this.firstSyncDone || ratesExpired) {
      this.rates = await this.sync()
      await this.saveRates(this.rates)
      this.firstSyncDone = true
    } else if(!this.rates){
      this.rates = await this.loadRates()
    }
    let cf = this.getCF(from, to)
    return amount * cf
  } catch(error) {
    throw new Error(error)
  }
}

module.exports = XCHANGE