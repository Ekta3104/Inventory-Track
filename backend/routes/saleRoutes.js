const express = require("express");
const router = express.Router();
const { createSale,getSalesHistory } = require("../controllers/saleController");

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

// ✔️ anyone logged can create sale
router.post("/", auth, createSale);
// 🔐 ONLY ADMIN can view sale history
router.get("/", auth, admin, getSalesHistory);


module.exports = router;