import Order from '../models/Order.js';
import { getIsConnected } from '../config/db.js';
import { inMemoryDB } from '../config/store.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      customerName,
      phone,
      deliveryAddress,
      subtotal,
      deliveryCharge = 40,
      totalAmount,
      paymentMethod = 'Cash on Delivery',
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items specified',
      });
    }

    if (!customerName || !phone || !deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: 'Please provide recipient name, phone number, and delivery address',
      });
    }

    const initialPaymentStatus = paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid';

    if (getIsConnected()) {
      const order = await Order.create({
        user: req.user ? req.user._id : null,
        userId: req.user ? req.user._id.toString() : null,
        customerName: customerName.trim(),
        phone: phone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        items,
        subtotal: Number(subtotal),
        deliveryCharge: Number(deliveryCharge),
        totalAmount: Number(totalAmount),
        paymentMethod,
        paymentStatus: initialPaymentStatus,
        orderStatus: 'Pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! The kitchen is receiving your order.',
        data: order,
      });
    } else {
      const newOrder = {
        _id: 'ord_' + Math.floor(100000 + Math.random() * 900000),
        user: req.user ? req.user._id : 'guest',
        userId: req.user ? req.user._id.toString() : 'guest',
        customerName: customerName.trim(),
        phone: phone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        items,
        subtotal: Number(subtotal),
        deliveryCharge: Number(deliveryCharge),
        totalAmount: Number(totalAmount),
        paymentMethod,
        paymentStatus: initialPaymentStatus,
        orderStatus: 'Pending',
        createdAt: new Date(),
      };

      inMemoryDB.orders.unshift(newOrder);

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! The kitchen is receiving your order.',
        data: newOrder,
      });
    }
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to place order',
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    if (getIsConnected()) {
      const orders = await Order.find({
        $or: [{ user: req.user._id }, { userId: userId }],
      }).sort({ createdAt: -1 });

      return res.json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } else {
      const orders = inMemoryDB.orders.filter(
        (o) =>
          o.user === userId ||
          o.userId === userId ||
          (o.phone && req.user.phone && o.phone === req.user.phone)
      );

      return res.json({
        success: true,
        count: orders.length,
        data: orders,
      });
    }
  } catch (error) {
    console.error('getMyOrders error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch customer orders',
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      return res.json({
        success: true,
        data: order,
      });
    } else {
      const order = inMemoryDB.orders.find((o) => o._id.toString() === id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
      return res.json({
        success: true,
        data: order,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order',
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const validStatuses = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (orderStatus && !validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid order status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

    if (getIsConnected()) {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      if (orderStatus) order.orderStatus = orderStatus;
      if (paymentStatus) order.paymentStatus = paymentStatus;

      const updatedOrder = await order.save();
      return res.json({
        success: true,
        message: `Order status updated to ${orderStatus || order.orderStatus}`,
        data: updatedOrder,
      });
    } else {
      const index = inMemoryDB.orders.findIndex((o) => o._id.toString() === id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      const order = inMemoryDB.orders[index];
      const updatedOrder = {
        ...order,
        orderStatus: orderStatus || order.orderStatus,
        paymentStatus: paymentStatus || order.paymentStatus,
      };

      inMemoryDB.orders[index] = updatedOrder;

      return res.json({
        success: true,
        message: `Order status updated to ${orderStatus || order.orderStatus}`,
        data: updatedOrder,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order status',
    });
  }
};
