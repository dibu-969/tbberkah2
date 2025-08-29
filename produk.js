const mongoose = require("mongoose");

const produkSchema = new mongoose.Schema({
  nama: String,
  Jenis: String,          // tambahin ini
  Harga: Number,          // huruf besar supaya cocok
  image_url: String       // tambahin ini
});

const Produk = mongoose.model("Produk", produkSchema, "PRODUK");

module.exports = Produk;
