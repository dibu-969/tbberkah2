const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

// Koneksi MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ Connection error:", err.message));

// Schema Produk
const produkSchema = new mongoose.Schema({
  nama: String,
  Jenis: String,
  Harga: Number,
  image_url: String,
});
const Produk = mongoose.model("Produk", produkSchema, "PRODUK");

const app = express();
app.use(cors());
app.use(express.json());

// API untuk semua produk
app.get("/api/produk", async (req, res) => {
  try {
    const produk = await Produk.find();
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API untuk detail produk
app.get("/api/produk/:id", async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);
    if (!produk) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json(produk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mengekspor aplikasi Express untuk Vercel
module.exports = app;