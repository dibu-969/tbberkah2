import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetailProduk from "./pages/DetailProduk";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produk/:id" element={<DetailProduk />} />
    </Routes>
  );
}
export default App;