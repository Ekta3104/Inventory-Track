const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  total: {                     // ✅ OPTION A HERE
      type: Number,
      required: true
    }
  
}, { timestamps: true });

module.exports = mongoose.model("Sale", saleSchema);