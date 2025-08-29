const mongoose = require("mongoose");

// Ganti dengan URI Atlas kamu
const uri = "mongodb+srv://fqhindra07:wahyunii@cluster0.ygayshk.mongodb.net/TBBERKAH?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Koneksi MongoDB Atlas BERHASIL");
  } catch (err) {
    console.error("❌ Gagal koneksi:", err.message);
  } finally {
    mongoose.connection.close(); // tutup setelah test
  }
}

connectDB();
