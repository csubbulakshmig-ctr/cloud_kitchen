import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/api';
import Loader from '../components/Loader';
import {
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  AlertCircle,
  RefreshCw,
  ChefHat,
  ChevronRight,
  Package,
} from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await orderService.getMyOrders();
      if (res.data?.data) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            ● Delivered
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 animate-pulse">
            ● Out for Delivery
          </span>
        );
      case 'Preparing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            ● Chef Preparing
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            ● Cancelled
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            ● Order Received
          </span>
        );
    }
  };

  const getProgressStep = (status) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Preparing':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Kitchen Orders
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 mt-0.5">
            My Orders
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Track real-time kitchen preparation and view past feast histories.
          </p>
        </div>

        <button
          onClick={fetchMyOrders}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:text-orange-600 hover:border-orange-300 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Orders</span>
        </button>
      </div>

      {loading ? (
        <Loader text="Fetching your orders..." />
      ) : error ? (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-800">Unable to load orders</h3>
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchMyOrders}
            className="px-6 py-2 rounded-xl bg-red-600 text-white font-semibold text-sm"
          >
            Retry
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-lg mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 stroke-1.5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-900">No Orders Yet</h3>
            <p className="text-sm text-stone-500">
              You haven't placed any delicious orders with Brindha Cloud Kitchen yet.
            </p>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all"
          >
            <span>Explore Menu & Order</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const step = getProgressStep(order.orderStatus);
            const isCancelled = order.orderStatus === 'Cancelled';

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden transition-all hover:shadow-md"
              >
                {/* Order Top Bar */}
                <div className="p-6 bg-stone-50/70 border-b border-stone-200/70 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-stone-900">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                      {getStatusBadge(order.orderStatus)}
                    </div>
                    <p className="text-xs text-stone-500">
                      Placed on{' '}
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Total Amount</span>
                    <span className="text-xl font-extrabold text-stone-900">
                      ₹{order.totalAmount}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      Via {order.paymentMethod}
                    </span>
                  </div>
                </div>

                {/* Progress Steps (if not cancelled) */}
                {!isCancelled && (
                  <div className="px-6 py-4 border-b border-stone-100 bg-white">
                    <div className="grid grid-cols-4 text-center text-xs font-semibold relative">
                      <div
                        className={`flex flex-col items-center gap-1.5 ${
                          step >= 1 ? 'text-orange-600' : 'text-stone-400'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 1
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          1
                        </div>
                        <span className="text-[11px]">Received</span>
                      </div>

                      <div
                        className={`flex flex-col items-center gap-1.5 ${
                          step >= 2 ? 'text-orange-600' : 'text-stone-400'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 2
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          2
                        </div>
                        <span className="text-[11px]">Preparing</span>
                      </div>

                      <div
                        className={`flex flex-col items-center gap-1.5 ${
                          step >= 3 ? 'text-orange-600' : 'text-stone-400'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 3
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          3
                        </div>
                        <span className="text-[11px]">On the Way</span>
                      </div>

                      <div
                        className={`flex flex-col items-center gap-1.5 ${
                          step >= 4 ? 'text-emerald-600' : 'text-stone-400'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            step >= 4
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-stone-200 text-stone-500'
                          }`}
                        >
                          4
                        </div>
                        <span className="text-[11px]">Delivered</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Items in this Order */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Dishes in this Order
                  </h4>

                  <div className="space-y-3 divide-y divide-stone-100">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 pt-3 first:pt-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        )}
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-bold text-stone-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-stone-500">
                            Quantity: {item.quantity} × ₹{item.price}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-stone-900 shrink-0">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery destination */}
                  <div className="pt-4 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-500">
                    <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-700">
                        Delivery to {order.customerName} ({order.phone}):
                      </span>{' '}
                      {order.deliveryAddress}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
