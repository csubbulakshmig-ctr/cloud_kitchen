import React, { useState, useEffect } from 'react';
import { adminService, foodService } from '../services/api';
import Loader from '../components/Loader';
import {
  Shield,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
  Clock,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'foods' | 'users'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Food modal state
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [foodForm, setFoodForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Biryani',
    image: '',
    rating: '4.8',
    available: true,
  });

  const categories = [
    'Biryani',
    'South Indian',
    'Chinese',
    'Chicken',
    'Vegetarian',
    'Desserts',
    'Beverages',
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, ordersRes, foodsRes, usersRes] = await Promise.all([
        adminService.getStats(),
        adminService.getAllOrders(),
        foodService.getAllFoods(),
        adminService.getAllUsers(),
      ]);

      if (statsRes.data?.data) setStats(statsRes.data.data);
      if (ordersRes.data?.data) setOrders(ordersRes.data.data);
      if (foodsRes.data?.data) setFoods(foodsRes.data.data);
      if (usersRes.data?.data) setUsers(usersRes.data.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setError(err.message || 'Failed to load kitchen administration data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      showNotification(`Order status updated to "${newStatus}"`);
      // Update locally
      setOrders((prev) =>
        prev.map((ord) =>
          ord._id === orderId ? { ...ord, orderStatus: newStatus } : ord
        )
      );
      // Refresh stats
      adminService.getStats().then((res) => {
        if (res.data?.data) setStats(res.data.data);
      });
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Food management
  const openAddFoodModal = () => {
    setEditingFood(null);
    setFoodForm({
      name: '',
      description: '',
      price: '',
      category: 'Biryani',
      image: '',
      rating: '4.8',
      available: true,
    });
    setIsFoodModalOpen(true);
  };

  const openEditFoodModal = (food) => {
    setEditingFood(food);
    setFoodForm({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image,
      rating: food.rating || '4.8',
      available: food.available ?? true,
    });
    setIsFoodModalOpen(true);
  };

  const handleSaveFood = async (e) => {
    e.preventDefault();
    if (!foodForm.name || !foodForm.price) {
      alert('Dish name and price are required');
      return;
    }

    try {
      if (editingFood) {
        await foodService.updateFood(editingFood._id, foodForm);
        showNotification(`Dish "${foodForm.name}" updated successfully`);
      } else {
        await foodService.createFood(foodForm);
        showNotification(`Dish "${foodForm.name}" added to menu`);
      }
      setIsFoodModalOpen(false);
      // Refresh foods list
      const foodsRes = await foodService.getAllFoods();
      if (foodsRes.data?.data) setFoods(foodsRes.data.data);
    } catch (err) {
      alert('Failed to save food: ' + err.message);
    }
  };

  const handleDeleteFood = async (foodId, foodName) => {
    if (!window.confirm(`Are you sure you want to remove "${foodName}" from the menu?`)) {
      return;
    }
    try {
      await foodService.deleteFood(foodId);
      showNotification(`Dish "${foodName}" removed`);
      setFoods((prev) => prev.filter((f) => f._id !== foodId));
    } catch (err) {
      alert('Failed to delete dish: ' + err.message);
    }
  };

  const toggleAvailability = async (food) => {
    try {
      const updated = { ...food, available: !food.available };
      await foodService.updateFood(food._id, { available: updated.available });
      setFoods((prev) =>
        prev.map((f) => (f._id === food._id ? { ...f, available: updated.available } : f))
      );
      showNotification(
        `"${food.name}" marked as ${updated.available ? 'Available' : 'Sold Out'}`
      );
    } catch (err) {
      alert('Failed to toggle availability: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Master Kitchen Administration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900">
            Brindha Kitchen Control Panel
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time management of incoming orders, menu inventory, and registered customers.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:text-orange-600 hover:border-orange-300 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Kitchen Data</span>
        </button>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Overview Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            ● Gross Sales
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
            {stats.totalOrders}
          </p>
          <span className="text-[11px] text-stone-400 font-medium mt-1 block">
            Across all time
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Pending Orders
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-2">
            {stats.pendingOrders}
          </p>
          <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
            Needs attention
          </span>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Total Users
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2">
            {stats.totalUsers}
          </p>
          <span className="text-[11px] text-stone-400 font-medium mt-1 block">
            Registered accounts
          </span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-stone-200 gap-4 sm:gap-8 text-sm font-bold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('foods')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'foods'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Food Catalog ({foods.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Registered Users ({users.length})</span>
        </button>
      </div>

      {loading ? (
        <Loader text="Loading kitchen command data..." />
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-800">Admin Synchronization Failed</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : (
        <>
          {/* TAB 1: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-stone-900">
                  Kitchen Live Orders
                </h2>
                <span className="text-xs text-stone-500">
                  Select dropdown to advance kitchen preparation steps
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
                  <p className="text-stone-500 text-sm">No orders recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord._id}
                      className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                        <div className="space-y-0.5">
                          <span className="font-mono text-xs font-bold text-stone-800">
                            #{ord._id}
                          </span>
                          <p className="text-xs text-stone-500">
                            {new Date(ord.createdAt).toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Order status dropdown */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-stone-500">Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-hidden cursor-pointer ${
                              ord.orderStatus === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : ord.orderStatus === 'Out for Delivery'
                                ? 'bg-purple-50 text-purple-800 border-purple-300'
                                : ord.orderStatus === 'Preparing'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : ord.orderStatus === 'Cancelled'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Pending">Pending (Received)</option>
                            <option value="Preparing">Preparing (Cooking)</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-stone-400 font-semibold block">Customer</span>
                          <p className="font-bold text-stone-900 mt-0.5">{ord.customerName}</p>
                          <p className="text-stone-500">{ord.phone}</p>
                        </div>

                        <div>
                          <span className="text-stone-400 font-semibold block">
                            Delivery Destination
                          </span>
                          <p className="text-stone-700 mt-0.5">{ord.deliveryAddress}</p>
                        </div>

                        <div>
                          <span className="text-stone-400 font-semibold block">Payment Info</span>
                          <p className="font-bold text-stone-900 mt-0.5">
                            ₹{ord.totalAmount} ({ord.paymentMethod})
                          </p>
                          <span className="text-[10px] text-stone-500">
                            Status: {ord.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="pt-2 border-t border-stone-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                          Order Ticket ({ord.items?.length || 0} items)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {ord.items?.map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium"
                            >
                              {item.quantity} × {item.name} (₹{item.price * item.quantity})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FOOD CATALOG MANAGEMENT */}
          {activeTab === 'foods' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-stone-900">
                    Food Catalog & Inventory
                  </h2>
                  <p className="text-xs text-stone-500">
                    Add new dishes, update prices, toggle daily availability or modify descriptions.
                  </p>
                </div>

                <button
                  onClick={openAddFoodModal}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Table / Grid */}
              <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Dish</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {foods.map((food) => (
                        <tr key={food._id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={food.image}
                                alt={food.name}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                              <div>
                                <p className="font-bold text-stone-900 line-clamp-1">
                                  {food.name}
                                </p>
                                <p className="text-xs text-stone-400 line-clamp-1 max-w-xs">
                                  {food.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                              {food.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-stone-900">
                            ₹{food.price}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleAvailability(food)}
                              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                                food.available
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {food.available ? 'Available' : 'Sold Out'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => openEditFoodModal(food)}
                              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit dish"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFood(food._id, food.name)}
                              className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete dish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REGISTERED USERS */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">
                Registered Kitchen Customers ({users.length})
              </h2>

              <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">User</th>
                        <th className="py-3.5 px-4">Email</th>
                        <th className="py-3.5 px-4">Phone</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-stone-50/50">
                          <td className="py-3 px-4 font-bold text-stone-900">{u.name}</td>
                          <td className="py-3 px-4 text-stone-600">{u.email}</td>
                          <td className="py-3 px-4 text-stone-600">{u.phone || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                                u.role === 'admin'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-stone-100 text-stone-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-stone-400 text-xs">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* FOOD MODAL (ADD / EDIT) */}
      {isFoodModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-xl font-bold text-stone-900">
                {editingFood ? 'Edit Dish Details' : 'Add New Dish to Menu'}
              </h3>
              <button
                onClick={() => setIsFoodModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFood} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                  placeholder="e.g. Special Bamboo Chicken Dum Biryani"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  rows="3"
                  value={foodForm.description}
                  onChange={(e) =>
                    setFoodForm({ ...foodForm, description: e.target.value })
                  }
                  placeholder="Appetizing description of ingredients and spices..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={foodForm.price}
                    onChange={(e) =>
                      setFoodForm({ ...foodForm, price: e.target.value })
                    }
                    placeholder="280"
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={foodForm.category}
                    onChange={(e) =>
                      setFoodForm({ ...foodForm, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={foodForm.image}
                  onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={foodForm.available}
                  onChange={(e) =>
                    setFoodForm({ ...foodForm, available: e.target.checked })
                  }
                  className="w-4 h-4 text-orange-600 rounded-sm"
                />
                <label htmlFor="availCheck" className="text-sm font-semibold text-stone-800">
                  Dish is Available for Ordering
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsFoodModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold shadow-xs cursor-pointer"
                >
                  {editingFood ? 'Save Changes' : 'Add Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
