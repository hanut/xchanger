const fs = require('fs')
const path = require('path')
const needle = require('needle')
const _ = require('lodash')
const STORAGE_PATH = path.join(__dirname, 'xchange.store')
const API_URL = 'https://exchangeratesapi.io/api/latest'
const VALID_BASE_CODES = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"]



const XCHANGE = function() {
  this.rates = {}
  _.each(VALID_BASE_CODES, code => {
    rates[code] = ''
  })
  this.base = "USD"
  this.updatedAt = new Date()
  this.updatedAt.setMinutes(this.updatedAt.getMinutes())
}

XCHANGE.prototype.sync = async function(base) {
  if(!base) {
    invalidError()
  }
  base = base.toUpperCase()
  if(VALID_BASE_CODES.indexOf(base) === -1) {
    invalidError()
  }
  return new Promise((resolve, reject) => {
    needle('get', API_URL + "?base="+BASE, {compressed: true}).then(response => {
      try{
        let syncDate = (new Date()).toISOString()
        let rates = response.body.rates
        resolve({date: syncDate, rates: rates})
      } catch(error) {
        reject(error)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

XCHANGE.prototype.saveRates = async function() {
  try {
    await fs.writeFile(STORAGE_PATH, JSON.stringify(XCHANGE_RATES))
    return
  } catch (error) {
    throw new Error(error)
  }
}

XCHANGE.prototype loadRates = async function() {
  try {
    let rawData = await fs.readFile(STORAGE_PATH, ratesData)
    let ratesData = JSON.parse(rawData)
    return ratesData
  } catch (error) {
    throw new Error(error)
  }
}

loadRates().then(rates => {
  XCHANGE_RATES = rates
}).catch(error => {
  console.log(error)
})

module.exports = {

  load

}