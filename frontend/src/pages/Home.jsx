import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  Star,
  Sparkles,
  Utensils,
  Leaf,
  Soup,
  Coffee,
  Cake,
  CheckCircle2,
  ChefHat,
  Truck,
  HeartHandshake,
} from 'lucide-react';
import { foodService } from '../services/api';
import FoodCard from '../components/FoodCard';
import Loader from '../components/Loader';

const categories = [
  { name: 'Biryani', icon: Flame, tag: 'Signature' },
  { name: 'South Indian', icon: Utensils, tag: 'Traditional' },
  { name: 'Chinese', icon: Soup, tag: 'Wok tossed' },
  { name: 'Chicken', icon: Flame, tag: 'Crispy & Rich' },
  { name: 'Vegetarian', icon: Leaf, tag: 'Farm Fresh' },
  { name: 'Desserts', icon: Cake, tag: 'Sweet Treats' },
  { name: 'Beverages', icon: Coffee, tag: 'Chilled' },
];

const reviews = [
  {
    name: 'Karthik Subramanian',
    role: 'Software Architect, Anna Nagar',
    rating: 5,
    comment:
      'The Seeraga Samba Mutton Biryani from Brindha Cloud Kitchen is hands down the best in the city. Arrived steaming hot, packed in eco-friendly insulated boxes. Meat was tender and aromatic!',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Ananya Reddy',
    role: 'Food Blogger, Chennai',
    rating: 5,
    comment:
      'I ordered the South Indian Meals and Parotta for a family get-together. The authentic spices reminded me of traditional wedding feasts. Clean, hygienic, and completely zero artificial colors.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Resident Physician',
    rating: 5,
    comment:
      'As a doctor, kitchen hygiene is my topmost concern. Brindha Cloud Kitchen exceeds all culinary safety standards. Delicious food that sits light on your stomach. 10/10 recommended!',
    image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
  },
];

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    foodService
      .getAllFoods()
      .then((res) => {
        if (res.data?.data) {
          // Take top 4-6 dishes
          setFeaturedFoods(res.data.data.slice(0, 6));
        }
      })
      .catch((err) => {
        console.error('Error fetching featured dishes:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 bg-gradient-to-b from-orange-50/60 via-[#FDFBF7] to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Premium Artisanal Cloud Kitchen</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                Delicious Food,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                  Delivered Fresh
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience authentic slow-cooked Dum Biryanis, heritage South Indian meals, and wok-tossed specialties crafted with hand-ground spices and farm-fresh ingredients. Piping hot delivery straight from our certified cloud kitchen.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigate('/menu')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate('/menu')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-stone-200/90 shadow-xs hover:border-orange-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Menu</span>
                  <Utensils className="w-4 h-4 text-orange-600" />
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-extrabold text-stone-900">30-40</span>
                  <span className="text-xs text-stone-500 font-medium">Mins Delivery</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-extrabold text-stone-900">100%</span>
                  <span className="text-xs text-stone-500 font-medium">Hygienic Prep</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-extrabold text-stone-900">4.9 ★</span>
                  <span className="text-xs text-stone-500 font-medium">Customer Rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative blob behind image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-orange-400/20 to-amber-200/40 rounded-3xl blur-2xl -z-10" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 sm:aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
                    alt="Authentic Dum Biryani with Spices"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                      Chef Special
                    </span>
                    <h3 className="text-xl font-bold mt-2">Royal Chicken Dum Biryani</h3>
                    <p className="text-xs text-stone-200 mt-1">
                      Slow-cooked in clay pots with aromatic saffron & fried onions
                    </p>
                  </div>
                </div>

                {/* Floating Rating Pill */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-stone-900">Top Rated Kitchen</p>
                    <p className="text-[11px] text-stone-500">Over 5,000+ Happy Orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOD CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Curation & Flavors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
            Explore Food Categories
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Click on any category to view our curated menu and filter your favorites instantly.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => navigate(`/menu?category=${encodeURIComponent(cat.name)}`)}
                className="group p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 hover:border-orange-500 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-bold text-stone-900 text-sm group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 font-medium">{cat.tag}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Kitchen Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
              Featured Signature Dishes
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              Freshly prepped daily by master chefs. Prepared to order with authentic regional recipes.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 group shrink-0"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <Loader text="Loading freshly cooked dishes..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-white py-16 sm:py-20 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Our Culinary Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
              Why Choose Brindha Cloud Kitchen?
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              We operate exclusively as a cloud kitchen, focusing 100% of our energy on culinary perfection, hygiene, and lightning-fast dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Fresh Ingredients</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Locally sourced vegetables, farm poultry, and cold-pressed pure oils with zero additives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Hygienic Cooking</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Hospital-grade sanitized facility, daily temperature checks, and certified food handlers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Fast Delivery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Thermal hot-insulation packaging ensures your meal reaches piping hot within 35 minutes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Quality Food</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Slow dum techniques and traditional stone-ground masalas preserving natural aromas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-stone-200/70 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-1">Delicious Taste</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Generations of tried and true family recipes that celebrate genuine regional heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Real Customer Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-1">
            Loved by Over 5,000+ Foodies
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Read what our happy customers say about their favorite meals from Brindha Cloud Kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-stone-100">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-orange-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{rev.name}</h4>
                  <p className="text-xs text-stone-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-black/10 pointer-events-none" />

          <div className="max-w-xl space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
              Hungry Right Now?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Order Your Fresh Meal from Brindha Cloud Kitchen Today
            </h2>
            <p className="text-sm sm:text-base text-orange-100">
              Fast, hot, and hygienic. Explore our rich biryanis, gravies, and South Indian meals.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => navigate('/menu')}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-stone-100 text-orange-600 font-extrabold text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              Order Online Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
