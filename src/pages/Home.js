// src/pages/Home.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  const [produk, setProduk] = useState([]);
  const [search, setSearch] = useState("");
  const [jenis, setJenis] = useState("Semua"); // default filter

  useEffect(() => {
    // URL API yang sudah diperbaiki
    fetch("/api/produk")
      .then((res) => res.json())
      .then((data) => setProduk(data))
      .catch((err) => console.error("❌ Gagal fetch produk:", err));
  }, []);

  const filteredProduk = produk.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(search.toLowerCase());
    const cocokJenis = jenis === "Semua" || item.Jenis === jenis;
    return cocokNama && cocokJenis;
  });

  const jenisList = ["Semua", ...new Set(produk.map((item) => item.Jenis))];

  return (
    <div className="home-container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Cari produk berdasarkan nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="filter-select"
        >
          {jenisList.map((j, index) => (
            <option key={index} value={j}>
              {j}
            </option>
          ))}
        </select>
      </div>
      <div className="produk-grid">
        {filteredProduk.length > 0 ? (
          filteredProduk.map((item) => (
            <Link
              key={item._id}
              to={`/produk/${item._id}`}
              className="produk-card-link"
            >
              <div className="produk-card">
                <img
                  src={item.image_url}
                  alt={item.nama}
                  className="produk-img"
                />
                <div className="produk-info">
                  <h3 className="produk-nama">{item.nama}</h3>
                  <p className="produk-harga">
                    Rp {item.Harga.toLocaleString()}
                  </p>
                  <span className="produk-detail">Klik untuk lihat detail</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-result">Produk tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}

export default Home;
