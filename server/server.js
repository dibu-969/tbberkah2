const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi MongoDB Atlas
mongoose.connect("mongodb+srv://fqhindra07:wahyunii@cluster0.ygayshk.mongodb.net/TBBERKAH?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ MongoDB Connected");
    // Hapus log ini setelah masalah teratasi
  })
  .catch(err => {
    console.error("❌ Connection error:", err.message);
    // Hapus log ini setelah masalah teratasi
  });
// Schema Produk
const produkSchema = new mongoose.Schema({
  nama: String,
  Jenis: String,
  Harga: Number,
  image_url: String,
});

// Pakai collection "PRODUK" (sesuai di Atlas)
const Produk = mongoose.model("Produk", produkSchema, "PRODUK");

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

module.exports = app;
