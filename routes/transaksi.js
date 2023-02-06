const express = require(`express`)
const app = express()

app.use(express.json()) 

let transaksiController = require("../controllers/transaksiController")

app.get("/", [
  authorization.authorization, transaksiController.getDataTransaksi])

app.post("/", [
  [authorization.authorization], mejaController.addDataTransaksi])