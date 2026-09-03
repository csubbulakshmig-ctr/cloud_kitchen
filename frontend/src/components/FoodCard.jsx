import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image and Category badge */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-stone-800 shadow-xs">
            {food.category}
          </span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>{food.rating ? Number(food.rating).toFixed(1) : '4.8'}</span>
          </div>
        </div>

        {/* Unavailable overlay if not available */}
        {!food.available && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link to={`/food/${food._id}`} className="group-hover:text-orange-600 transition-colors">
            <h3 className="text-lg font-bold text-stone-900 line-clamp-1 mb-1.5">
              {food.name}
            </h3>
          </Link>
          <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed mb-4">
            {food.description}
          </p>
        </div>

        {/* Footer: Price & Action Buttons */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-stone-500 block">Price</span>
            <span className="text-xl font-extrabold text-stone-900">₹{food.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/food/${food._id}`}
              className="p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="View Details"
              aria-label={`View details of ${food.name}`}
            >
              <Eye className="w-4 h-4" />
            </Link>

            <button
              onClick={handleAdd}
              disabled={!food.available}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                !food.available
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/20 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
