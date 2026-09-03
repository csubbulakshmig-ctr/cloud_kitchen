import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  ShieldCheck,
  Flame,
  Truck,
  Heart,
  Award,
  Sparkles,
  Users,
  CheckCircle,
} from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>The Brindha Culinary Journey</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Crafting Heritage Flavors with Cloud Kitchen Precision
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          Founded with a relentless commitment to authentic taste, Brindha Cloud Kitchen blends time-honored slow-cooking traditions with contemporary food-safety and delivery technology.
        </p>
      </div>

      {/* Story & Visual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
              alt="Artisanal Chef Kitchen"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-stone-100 max-w-xs hidden sm:block">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-orange-600" />
              <span className="font-extrabold text-stone-900 text-sm">30+ Years Recipe Legacy</span>
            </div>
            <p className="text-xs text-stone-500">
              Passed down through generations of home chefs and perfected in our cloud hubs.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Our Story
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900">
            From a Passionate Family Hearth to a Modern Cloud Kitchen
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Brindha Cloud Kitchen was founded on a simple observation: modern diners want food that tastes like genuine homemade feast cooking, without compromising on hygiene or waiting hours for restaurant delivery.
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            We stripped away the noisy dining halls and expensive front-of-house overheads. Instead, we directed every single resource into premium ingredients, certified hygienic preparation stations, and master chefs who honor the art of the dum and slow simmering.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-orange-600 shrink-0" />
              <span className="text-sm font-semibold text-stone-800">
                100% Certified Whole Spices ground freshly every morning
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-orange-600 shrink-0" />
              <span className="text-sm font-semibold text-stone-800">
                Clay-pot and copper-base slow cooking for unparalleled dum infusion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-orange-600 shrink-0" />
              <span className="text-sm font-semibold text-stone-800">
                Continuous temperature telemetry during cooking and packing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900">Our Mission</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            To serve heartfelt, authentic, and pure regional cuisine prepared in a spotless kitchen environment, delivered quickly to our customers so every meal feels like a celebration at home.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-stone-900">Our Vision</h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            To become India’s most trusted and beloved cloud kitchen brand, celebrated for uncompromising quality standards, culinary integrity, and unforgettable taste experiences.
          </p>
        </div>
      </div>

      {/* Pillars of Kitchen Excellence */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 shadow-xs space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
            Core Standards
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-1">
            Our Quality Commitment
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Every dish we pack carries our signature stamp of safety, authenticity, and freshness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2 p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
            <ShieldCheck className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-bold text-stone-900 text-base">Hygienic Preparation</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Stainless steel prep counters sanitized hourly, continuous air filtration, and headgear mandates.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
            <UtensilsCrossed className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-bold text-stone-900 text-base">Freshly Prepared</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              We never pre-package or microwave frozen meals. Food is cooked and packed strictly upon order confirmation.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
            <Truck className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-bold text-stone-900 text-base">Thermal Fast Delivery</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Heat-lock food-grade aluminum containers placed inside thermal bags preserve hot freshness right to your door.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-[#FDFBF7] border border-stone-100">
            <Heart className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-bold text-stone-900 text-base">Customer Satisfaction</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              If an order ever fails to delight you, our kitchen team makes it right with our 100% satisfaction guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-6">
        <h3 className="text-2xl font-bold text-stone-900 mb-4">
          Ready to experience the Brindha difference?
        </h3>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/25 transition-all"
        >
          <span>Explore Our Menu</span>
          <UtensilsCrossed className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default About;
