import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, Heart, Award, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  BRINDHA
                </span>
                <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase block">
                  Cloud Kitchen
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Brindha Cloud Kitchen crafts authentic, artisanal biryanis and heritage South Indian dishes prepared in a certified state-of-the-art hygienic cloud facility, delivered hot and fresh to your doorstep.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% FSSAI Certified & Temperature Monitored</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-orange-400 transition-colors">
                  Explore Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Kitchen
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="hover:text-orange-400 transition-colors">
                  Track Your Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialties */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Kitchen Specialties
            </h3>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li>Dum Chicken Biryani</li>
              <li>Seeraga Samba Mutton Biryani</li>
              <li>Grand South Indian Meals</li>
              <li>Flaky Malabar Parotta & Kurma</li>
              <li>Butter Chicken & Paneer Makhani</li>
              <li>Hot Gulab Jamun with Rose Syrup</li>
            </ul>
          </div>

          {/* Column 4: Kitchen Hub & Timings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Contact & Hub
            </h3>
            <div className="flex items-start gap-3 text-sm text-stone-400">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>
                Kitchen Hub 4, Commercial Road, Metro Zone, Anna Nagar, Chennai - 600040
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-400">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <span>+91 98765 43210 / +91 44 2618 9000</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-stone-400">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>orders@brindhacloudkitchen.com</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-stone-400 pt-2 border-t border-stone-800">
              <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-300">Kitchen Timings:</p>
                <p className="text-xs">Monday - Sunday: 11:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-center sm:flex sm:justify-between sm:items-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Brindha Cloud Kitchen. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for authentic food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
