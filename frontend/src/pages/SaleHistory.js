import { useEffect, useRef, useState } from "react";
import axios from "axios";

function SaleHistory() {
  const [sales, setSales] = useState([]);
  const printRef = useRef();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/sales", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSales(res.data);
    } catch (err) {
      alert("Failed to load sales history");
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    win.document.write(`
      <html>
        <head>
          <title>Sale History</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; }
            th { background: #1e3a8a; color: white; }
          </style>
        </head>
        <body>
          <h2>Sale History</h2>
          ${printContent}
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };
  

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">
          📜 Sale History
        </h1>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          🖨️ Print
        </button>
      </div>

      {/* Table Card */}
      <div
        ref={printRef}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No sales found
                  </td>
                </tr>
              ) : (
                sales.map((s, i) => (
                  <tr
                    key={s._id}
                    className={`border-b ${
                      i % 2 === 0 ? "bg-slate-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="px-4 py-3">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {s.product?.name || "Deleted Product"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {s.quantity}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹ {s.price}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                      ₹ {s.total}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SaleHistory;