import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  UtensilsCrossed,
  Truck,
  ShieldCheck,
} from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center space-y-8">
      {/* Animated Success Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Order Confirmed & Received
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          Your Food is Being Prepared!
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-lg mx-auto">
          Thank you for choosing Brindha Cloud Kitchen. Our chefs have received your order ticket and are firing up the ovens and dum pots.
        </p>
      </div>

      {/* Order Details Card */}
      {order && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
            <div>
              <span className="text-xs text-stone-400 font-semibold block">Order Reference</span>
              <span className="font-mono text-sm font-bold text-stone-900">
                #{order._id}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full w-fit">
              <Clock className="w-4 h-4" />
              <span>Est. Delivery: 35–45 minutes</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-400 font-semibold block">Deliver to</span>
              <p className="font-bold text-stone-900 mt-0.5">{order.customerName}</p>
              <p className="text-stone-600 mt-0.5">{order.deliveryAddress}</p>
              <p className="text-stone-500 mt-0.5">Contact: {order.phone}</p>
            </div>
            <div>
              <span className="text-stone-400 font-semibold block">Payment Summary</span>
              <p className="font-bold text-stone-900 mt-0.5">
                Total Paid/Due: ₹{order.totalAmount}
              </p>
              <p className="text-stone-600 mt-0.5">Method: {order.paymentMethod}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded-sm text-[10px]">
                Status: {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Ordered items list */}
          {order.items && order.items.length > 0 && (
            <div className="pt-4 border-t border-stone-100 space-y-2">
              <span className="text-xs text-stone-400 font-semibold block">Items Ordered</span>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs text-stone-700">
                    <span className="font-medium">
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-bold text-stone-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/my-orders"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Track in My Orders</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-200 shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <UtensilsCrossed className="w-4 h-4 text-orange-600" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
