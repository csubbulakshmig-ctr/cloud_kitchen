import User from '../models/User.js';
import Order from '../models/Order.js';
import Food from '../models/Food.js';
import { getIsConnected } from '../config/db.js';
import { inMemoryDB } from '../config/store.js';

// @desc    Get admin dashboard metrics & stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    if (getIsConnected()) {
      const totalUsers = await User.countDocuments({ role: 'customer' });
      const totalOrders = await Order.countDocuments();
      const pendingOrders = await Order.countDocuments({
        orderStatus: { $in: ['Pending', 'Preparing', 'Out for Delivery'] },
      });
      const deliveredOrders = await Order.countDocuments({ orderStatus: 'Delivered' });

      const revenueAgg = await Order.aggregate([
        { $match: { orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]);
      const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

      const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
      const totalFoods = await Food.countDocuments();

      return res.json({
        success: true,
        data: {
          totalUsers,
          totalOrders,
          totalRevenue,
          pendingOrders,
          deliveredOrders,
          totalFoods,
          recentOrders,
        },
      });
    } else {
      const totalUsers = inMemoryDB.users.filter((u) => u.role === 'customer').length;
      const totalOrders = inMemoryDB.orders.length;
      const pendingOrders = inMemoryDB.orders.filter((o) =>
        ['Pending', 'Preparing', 'Out for Delivery'].includes(o.orderStatus)
      ).length;
      const deliveredOrders = inMemoryDB.orders.filter((o) => o.orderStatus === 'Delivered').length;
      const totalRevenue = inMemoryDB.orders
        .filter((o) => o.orderStatus !== 'Cancelled')
        .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
      const recentOrders = inMemoryDB.orders.slice(0, 5);
      const totalFoods = inMemoryDB.foods.length;

      return res.json({
        success: true,
        data: {
          totalUsers,
          totalOrders,
          totalRevenue,
          pendingOrders,
          deliveredOrders,
          totalFoods,
          recentOrders,
        },
      });
    }
  } catch (error) {
    console.error('getDashboardStats error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch admin stats',
    });
  }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: users.length,
        data: users,
      });
    } else {
      const users = inMemoryDB.users.map(({ password, ...u }) => u);
      return res.json({
        success: true,
        count: users.length,
        data: users,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
    });
  }
};

// @desc    Get all customer orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    if (getIsConnected()) {
      const orders = await Order.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } else {
      return res.json({
        success: true,
        count: inMemoryDB.orders.length,
        data: inMemoryDB.orders,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch all orders',
    });
  }
};
