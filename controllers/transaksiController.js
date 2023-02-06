const req = require("express/lib/request")

let modelTransaksi = require("../models/index").modelTransaksi

exports.getDataTransaksi = (request, response) => {
  modelTransaksi.findAll()
  .then(result => {
    return response.json(result)
  })
  .catch(error => {
    return response.json({
      message: error.message
    })
  })
}

exports.addDataTransaksi = (request, response) =>{
  let newTransaksi = {
    
  }
}