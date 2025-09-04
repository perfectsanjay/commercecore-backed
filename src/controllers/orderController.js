import Order from "../models/order.js";
import stripe from "../../utils/stripe.js";

// Create order
export const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user.id, // comes from auth middleware
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (err) {
    next(err);
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("orderItems.product", "name price");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Get all orders (admin only)
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "id name email");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Update order to delivered
export const updateOrderToDelivered = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    next(err);
  }
};

// Pay for an order (Stripe integration)
export const payOrder = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.totalPrice * 100), // Stripe expects amount in cents/paise
        currency: "inr",
        payment_method_types: ["card"],
        metadata: {
          orderId: order._id.toString(),
          userId: order.user.toString(),
        },
      });
  
      res.json({
        clientSecret: paymentIntent.client_secret,
        orderId: order._id,
      });
    } catch (err) {
      next(err);
    }
  };