const express = require(`express`)
const app = express()
const authorization = require("../middlewares/authorization")

app.use(express.json()) // membaca data dalam format json

let transaksiController = require("../controllers/transaksiController")

app.get("/", [authorization.authorization], transaksiController.getDataTransaksi)

app.post("/", [authorization.authorization], transaksiController.addDataTransaksi)

app.put("/:id_transaksi", [authorization.authorization], transaksiController.updateDataTransaksi)

app.delete("/:id_transaksi", [authorization.authorization], transaksiController.deleteDataTransaksi)

app.get("/:id_transaksi", [authorization.authorization], transaksiController.ubahStatus)

app.post("/date", [authorization.authorization],transaksiController.filterTransaksi)

app.post("/find", [authorization.authorization],transaksiController.findTransaksi)

module.exports = app
