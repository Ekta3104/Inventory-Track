const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    quantity: Number,
    category: String,

    lowStockLimit: {
      type: Number,
      default: 5   // 🔔 5 पेक्षा कमी असेल तर low stock
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
