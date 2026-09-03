import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b border-stone-100 last:border-0">
      {/* Thumbnail */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-stone-200/80 shrink-0 bg-stone-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
        }}
      />

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h4 className="font-bold text-stone-900 text-sm sm:text-base truncate">
          {item.name}
        </h4>
        <span className="text-xs font-semibold text-orange-600 block mt-0.5">
          {item.category || 'Specialty'}
        </span>
        <p className="text-xs text-stone-500 mt-1">₹{item.price} each</p>

        {/* Mobile price & total */}
        <div className="sm:hidden mt-2 flex items-center justify-between">
          <span className="font-bold text-stone-900 text-sm">
            ₹{item.price * item.quantity}
          </span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center border border-stone-200 rounded-xl bg-white shadow-2xs overflow-hidden shrink-0">
        <button
          onClick={() => updateQuantity(item.food, item.quantity - 1)}
          className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <span className="w-8 text-center text-xs sm:text-sm font-bold text-stone-900">
          {item.quantity}
        </span>

        <button
          onClick={() => updateQuantity(item.food, item.quantity + 1)}
          className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Total for item & Delete action */}
      <div className="hidden sm:block text-right min-w-[70px] shrink-0">
        <span className="text-base font-extrabold text-stone-900">
          ₹{item.price * item.quantity}
        </span>
      </div>

      <button
        onClick={() => removeFromCart(item.food)}
        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
        title="Remove item"
        aria-label={`Remove ${item.name}`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CartItem;
