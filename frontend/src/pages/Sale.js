import React, { useEffect, useState } from "react";
import axios from "axios";

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  // Fetch products from backend
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);

      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("PRODUCT API RESPONSE:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.log("PRODUCT FETCH ERROR:", err.response?.data || err.message);
    }
  };

  fetchProducts();
}, []);
  // Handle sale submission
  const handleSale = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You are not logged in!");

      if (!productId) return alert("Please select a product");
      if (!quantity || Number(quantity) <= 0)
        return alert("Enter valid quantity");

      const res=await axios.post(
        "http://localhost:5000/api/sales",
        { productId, quantity: Number(quantity) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Sale Done ✅",res.data);

      if (res.data.lowStock) {
  alert(
    `⚠️ Low Stock Alert!\nRemaining Stock: ${res.data.remainingStock}`
  );
}
      setProductId("");
      setQuantity("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Sale failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
    
    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
      🛒 Create Sale
    </h2>

    {/* Product Select */}
    <div className="mb-4">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Select Product
      </label>
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">-- Select Product --</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} = {p.quantity} in stock
          </option>
        ))}
      </select>
    </div>

    {/* Quantity */}
    <div className="mb-6">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Quantity
      </label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        placeholder="Enter quantity"
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    {/* Button */}
    <button
      onClick={handleSale}
      className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
    >
      Sell Product
    </button>

  </div>
</div>
  )
};

export default SalePage;