const needle = require('needle')
const API_URL = 'https://exchangeratesapi.io/api/latest'
const VALID_BASE_CODES = ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","ISK","JPY","KRW","MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"]

let BASE = "USD"

function invalidError() {
  throw new Error('Invalid or Missing base currency code')
}


_selfRef = module.exports = {

  setBase: function(newBase) {
    if(!newBase) {
      return invalidError()
    }
    newBase = newBase.toUpperCase()
    if(VALID_BASE_CODES.indexOf(newBase) === -1 ) {
      invalidError()
    }
    BASE = newBase
  },

  getBase: function() {
    return BASE
  },

  sync: function(){
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

}