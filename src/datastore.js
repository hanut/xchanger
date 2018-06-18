const sqlite3 = require('sqlite3').verbose()
let DB = undefined

function openDB(path) {
  return new Promise((resolve, reject) => {
    DB = new sqlite3.Database(path, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve(DB)
      }
    })
  })
}

_selfRef = module.exports = {

  init: openDB,

  db: function() {
    return DB
  },

  get: function(){
    return new Promise((resolve, reject) => {

    })
  }



}