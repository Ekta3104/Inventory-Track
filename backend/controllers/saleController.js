const Sale = require("../models/Sale");
const Product = require("../models/Product");

// CREATE SALE
// CREATE SALE
exports.createSale = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.quantity < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    // create sale
    const sale = new Sale({
      product: productId,
      quantity,
      price: product.price,
      total: product.price * quantity,
      soldBy: req.user.id,
    });

    await sale.save();

    // reduce stock
    product.quantity -= quantity;
    await product.save();

    const LOW_STOCK_LIMIT = 5;
    const lowStock = product.quantity <= LOW_STOCK_LIMIT;

    console.log("Remaining:", product.quantity);
    console.log("Low stock:", lowStock);

    res.status(201).json({
      message: "Sale completed",
      sale,
      lowStock,
      remainingStock: product.quantity
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SALES HISTORY
exports.getSalesHistory = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product", "name")
      .populate("soldBy", "name email")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};