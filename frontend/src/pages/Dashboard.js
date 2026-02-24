import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null); // 👈 IMPORTANT

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  // 🔐 Auth check + fetch products
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    fetchProducts();
  }, []);

  // 📦 Fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  // 📝 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ➕ Add product
  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/products",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Product Added");
      setForm({ name: "", price: "", quantity: "", category: "" });
      fetchProducts();
    } catch (err) {
      alert("Add product failed");
    }
  };

  // ✏️ Click Edit
  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category
    });
  };

  // 🔄 Update product (admin only)
  const updateProduct = async () => {
  if (!editingId) {
    alert("No product selected for update");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/products/${editingId}`,
      form,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Product Updated");
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      quantity: "",
      category: ""
    });

    fetchProducts();
  } catch (error) {
    console.error(error);
    alert("Error updating product");
  }
};
  // 🗑️ Delete product (admin only)
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Product Deleted");
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      if (error.response?.status === 403) {
        alert(error.response.data.message); // Only admin can delete
      } else {
        alert("Delete failed");
      }
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
  <div className="min-h-screen bg-gray-100">
    {/* 🔝 Navbar */}
    <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Inventory Dashboard</h1>
      <div className="flex gap-3">
        <button
      onClick={() => navigate("/sale")}
      className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition"
    >
      Sale
    </button>
    <button
      onClick={() => navigate("/sale-history")}
      className="bg-green-500 px-4 py-1 rounded hover:bg-green-600 transition"
    >
      Sale History
    </button>
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      

      </div>
      
       
    </div>

    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* ➕ Add / Update Product */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingId ? "Update Product" : "Add Product"}
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={editingId ? updateProduct : addProduct}
            className={`w-full py-2 rounded text-white font-semibold transition
              ${editingId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* 📦 Products List */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow p-4"
              >
                <div className="bg-white rounded-xl shadow p-4">
  <h3 className="font-bold text-lg">{p.name}</h3>

  <p className="text-sm text-gray-600">
    Category: {p.category}
  </p>

  <p className="mt-1">💰 Price: {p.price}</p>

  <p
    className={`font-semibold ${
      p.quantity <= p.lowStockLimit ? "text-red-600" : ""
    }`}
  >
    📦 Quantity: {p.quantity}
  </p>

  {p.quantity <= p.lowStockLimit && (
    <span className="inline-block text-xs bg-red-600 text-white px-2 py-1 rounded mt-1">
      ⚠️ Low Stock
    </span>
  )}

  {/* Admin Edit/Delete buttons */}
</div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editProduct(p)}
                    className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Dashboard;