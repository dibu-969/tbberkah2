import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetailProduk.css";

function DetailProduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [selectedMacam, setSelectedMacam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // REVISI PENTING: Menggunakan jalur relatif untuk Vercel
    fetch(`/api/produk/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduk(data);
        if (data.macam && data.macam.length > 0) {
          setSelectedMacam(data.macam[0]); // otomatis pilih macam pertama
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!produk) {
    return <p>Produk tidak ditemukan</p>;
  }

  // Tentukan gambar & harga yang ditampilkan
  const displayImage = selectedMacam ? selectedMacam.image_url : produk.image_url;
  const displayHarga = selectedMacam ? selectedMacam.Harga : produk.Harga;

  return (
    <div className="detail-container">
      {/* Bagian gambar di kiri */}
      <div className="detail-left">
        <img src={displayImage} alt={produk.nama} className="detail-image" />
      </div>

      {/* Bagian info di kanan */}
      <div className="detail-right">
        <h2 className="detail-title">{produk.nama || "Nama tidak ada"}</h2>
        <p className="detail-price">Harga: Rp {displayHarga?.toLocaleString() || "-"}</p>

        {produk.macam && produk.macam.length > 0 && (
          <div className="detail-options">
            {produk.macam.map((item, index) => (
              <button
                key={index}
                className={`detail-button ${selectedMacam?.ukuran === item.ukuran ? "active" : ""}`}
                onClick={() => setSelectedMacam(item)}
              >
                {item.ukuran}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailProduk;
