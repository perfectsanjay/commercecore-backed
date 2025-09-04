import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Middleware to check admin
const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
  next();
};

// Create order
router.post("/", auth, createOrder);

// Get logged-in user's orders
router.get("/myorders", auth, getMyOrders);

// Admin: Get all orders
router.get("/", auth, admin, getAllOrders);

// Admin: Mark order as delivered
router.put("/:id/deliver", auth, admin, updateOrderToDelivered);

export default router;
