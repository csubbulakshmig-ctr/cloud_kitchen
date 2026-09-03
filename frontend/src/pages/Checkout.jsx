import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  Phone,
  User,
  AlertCircle,
  ArrowLeft,
  Truck,
} from 'lucide-react';

const Checkout = () => {
  const { cartItems, subtotal, deliveryCharge, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    phone: user?.phone || '',
    deliveryAddress: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If cart is empty, redirect
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.customerName.trim()) {
      setError('Please provide your name for the delivery package');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setError('Please provide a valid delivery contact phone number');
      return;
    }
    if (!formData.deliveryAddress.trim() || formData.deliveryAddress.length < 10) {
      setError('Please provide a detailed delivery address (House/Flat No, Street, Area, Pincode)');
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        deliveryAddress: formData.deliveryAddress.trim(),
        items: cartItems.map((item) => ({
          food: item.food,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        deliveryCharge,
        totalAmount,
        paymentMethod: formData.paymentMethod,
      };

      const res = await orderService.createOrder(orderPayload);
      const createdOrder = res.data?.data;

      // Clear the shopping cart
      clearCart();

      // Navigate to order success page with order details
      navigate('/order-success', {
        state: { order: createdOrder },
        replace: true,
      });
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-orange-600 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-3xl font-extrabold text-stone-900">
          Delivery & Checkout
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          Complete your delivery details to place your fresh cloud kitchen order.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Form: Delivery details & Payment */}
          <div className="lg:col-span-7 space-y-8">
            {/* Delivery Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>1. Delivery Address & Contact</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Receiver's Name"
                      className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Phone Number (for delivery rider) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Complete Street Address *
                  </label>
                  <textarea
                    name="deliveryAddress"
                    rows="3"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    placeholder="Flat / Door No, Apartment name, Street, Landmark, Area, City, Pincode"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method Selection Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span>2. Select Payment Method</span>
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Cash on Delivery'
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={handleChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-stone-900 text-sm block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-xs text-stone-500">
                        Pay with cash or QR scan to the rider upon arrival
                      </span>
                    </div>
                  </div>
                  <Banknote className="w-6 h-6 text-stone-500" />
                </label>

                {/* UPI */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'UPI'
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={handleChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-stone-900 text-sm block">
                        Instant UPI Payment
                      </span>
                      <span className="text-xs text-stone-500">
                        Google Pay, PhonePe, Paytm, BHIM UPI
                      </span>
                    </div>
                  </div>
                  <Smartphone className="w-6 h-6 text-orange-600" />
                </label>

                {/* Card */}
                <label
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'Card'
                      ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={formData.paymentMethod === 'Card'}
                      onChange={handleChange}
                      className="text-orange-600 focus:ring-orange-500 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold text-stone-900 text-sm block">
                        Credit / Debit Card
                      </span>
                      <span className="text-xs text-stone-500">
                        Visa, Mastercard, RuPay, Maestro
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-6 h-6 text-stone-500" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-4">
                Order Review ({cartItems.length} items)
              </h3>

              {/* Mini Item List */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-stone-50 pr-1">
                {cartItems.map((item) => (
                  <div key={item.food} className="flex items-center gap-3 pt-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-100"
                    />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-3 pt-4 border-t border-stone-100 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-stone-900">
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="text-base font-extrabold text-stone-900">Total Due</span>
                  <span className="text-2xl font-extrabold text-orange-600">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? 'Dispatching to Kitchen...' : `Place Order • ₹${totalAmount}`}</span>
              </button>

              <div className="pt-2 text-center text-xs text-stone-400 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Estimated Kitchen Dispatch: 15–20 mins</span>
                </p>
                <p>30–40 mins overall doorstep delivery</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
