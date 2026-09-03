import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Flame,
  Clock,
  Check,
  Utensils,
  Share2,
} from 'lucide-react';
import { foodService } from '../services/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    foodService
      .getFoodById(id)
      .then((res) => {
        if (res.data?.data) {
          setFood(res.data.data);
        } else {
          setError('Dish not found in kitchen catalog');
        }
      })
      .catch((err) => {
        console.error('Error fetching food details:', err);
        setError(err.message || 'Failed to load food details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!food || !food.available) return;
    addToCart(food, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Preparing dish details..." />
      </div>
    );
  }

  if (error || !food) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-2xl text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Dish Not Found</h2>
        <p className="text-sm text-stone-600">{error || 'We could not locate this menu item.'}</p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-orange-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to dishes</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs">
        {/* Left: Large Food Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-stone-900 shadow-md backdrop-blur-md">
                {food.category}
              </span>
            </div>
            {!food.available && (
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
                <span className="bg-red-600 text-white text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                  Sold Out Today
                </span>
              </div>
            )}
          </div>

          {/* Quick guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-stone-50 rounded-xl text-center border border-stone-100">
              <Clock className="w-4 h-4 text-orange-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-stone-700 block">30-40 Mins</span>
              <span className="text-[10px] text-stone-400">Fresh Delivery</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl text-center border border-stone-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-stone-700 block">100% Hygienic</span>
              <span className="text-[10px] text-stone-400">FSSAI Certified</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl text-center border border-stone-100">
              <Flame className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <span className="text-[11px] font-bold text-stone-700 block">Piping Hot</span>
              <span className="text-[10px] text-stone-400">Thermal Packed</span>
            </div>
          </div>
        </div>

        {/* Right: Dish Specs & Ordering */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
                {food.category} Specialty
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-xs shadow-xs">
                <Star className="w-4 h-4 fill-white" />
                <span>{food.rating ? Number(food.rating).toFixed(1) : '4.8'}</span>
                <span className="text-amber-100 text-[10px] font-normal">(120+ reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {food.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-stone-900">
                ₹{food.price}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                (Inclusive of all kitchen taxes)
              </span>
            </div>

            <div className="border-t border-stone-100 pt-4">
              <h3 className="text-sm font-bold text-stone-900 mb-2">Description</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Preparation Details */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 space-y-2 text-xs text-stone-600">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <strong className="text-stone-800">Freshly prepared:</strong> Cooked only upon order confirmation.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <strong className="text-stone-800">Serving size:</strong> Generous portion suitable for 1-2 persons.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <strong className="text-stone-800">Quality check:</strong> Non-GMO spices, zero artificial colors or tasting salts.
              </p>
            </div>
          </div>

          {/* Quantity selector & Add to Cart */}
          <div className="pt-6 border-t border-stone-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center justify-between border border-stone-200 rounded-2xl bg-white p-1.5 w-full sm:w-auto shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-base text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={!food.available}
                className={`flex-grow w-full sm:w-auto py-4 px-8 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                  !food.available
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                    : added
                    ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 active:scale-98'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart • ₹{food.price * quantity}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
              <Link to="/menu" className="hover:text-orange-600 underline">
                Browse other dishes
              </Link>
              <Link to="/cart" className="hover:text-orange-600 font-semibold">
                Go to checkout →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
