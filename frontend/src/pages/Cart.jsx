import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Truck,
  ShieldCheck,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';

const Cart = () => {
  const { cartItems, subtotal, deliveryCharge, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const freeDeliveryThreshold = 500;
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10 stroke-1.5" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Your Food Cart is Empty
          </h1>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Looks like you haven't added any delicious dishes yet. Explore our freshly cooked biryanis, curries, and meals!
          </p>
        </div>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Explore Our Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Your Selection
          </span>
          <h1 className="text-3xl font-extrabold text-stone-900 mt-0.5">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-600 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear entire cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free delivery bar */}
          <div className="bg-orange-50 border border-orange-200/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-orange-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                {subtotal >= freeDeliveryThreshold
                  ? 'Congratulations! You unlocked FREE Delivery 🎉'
                  : `Add ₹${remainingForFree} more for FREE Delivery!`}
              </span>
              <span className="font-bold text-orange-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-orange-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs divide-y divide-stone-100">
            {cartItems.map((item) => (
              <CartItem key={item.food} item={item} />
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Add more delicious items from Menu</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 sticky top-28">
            <h3 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-4">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-stone-900">₹{subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  Delivery Charge
                  {deliveryCharge === 0 && (
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                      Free
                    </span>
                  )}
                </span>
                <span className="font-bold text-stone-900">
                  {deliveryCharge === 0 ? '₹0' : `₹${deliveryCharge}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-stone-600">
                <span>Restaurant Packaging & Taxes</span>
                <span className="font-bold text-emerald-600">Free</span>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-baseline justify-between">
                <span className="text-base font-extrabold text-stone-900">Grand Total</span>
                <span className="text-2xl font-extrabold text-orange-600">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isAuthenticated && (
              <p className="text-[11px] text-stone-500 text-center">
                * You will be prompted to login/register to complete delivery details.
              </p>
            )}

            <div className="pt-2 border-t border-stone-100 text-xs text-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure hygienic packaging & verified contactless delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
