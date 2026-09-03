import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu as MenuIcon, X, User, LogOut, Shield, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-orange-600 bg-orange-50 font-semibold'
        : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
      isActive
        ? 'text-orange-600 bg-orange-50 font-semibold'
        : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 block leading-tight">
                BRINDHA
              </span>
              <span className="text-xs font-semibold text-orange-600 tracking-wider uppercase block -mt-0.5">
                Cloud Kitchen
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/menu" className={navLinkClass}>
              Menu
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/my-orders" className={navLinkClass}>
                My Orders
              </NavLink>
            )}
            {isAuthenticated && isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'text-red-700 bg-red-100 font-bold'
                      : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                  }`
                }
              >
                <Shield className="w-4 h-4" />
                Admin
              </NavLink>
            )}
          </div>

          {/* Desktop Right Actions (Cart & Auth) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-colors focus:outline-hidden"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-scale">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 pl-2 border-l border-stone-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-sm font-bold border border-orange-200">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-stone-900 leading-tight">
                      {user?.name}
                    </p>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                      {user?.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-stone-700 hover:text-orange-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Buttons (Cart + Hamburger) */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-stone-700 hover:text-orange-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-orange-600 hover:bg-stone-100 focus:outline-hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FDFBF7] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/menu" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Menu
          </NavLink>
          <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Contact
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/my-orders"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Orders
            </NavLink>
          )}
          {isAuthenticated && isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-base font-bold text-red-600 ${
                  isActive ? 'bg-red-50' : 'hover:bg-red-50'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Dashboard
            </NavLink>
          )}

          <div className="pt-4 border-t border-stone-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-4 py-2 flex items-center gap-3 bg-stone-100 rounded-lg">
                  <User className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{user?.name}</p>
                    <p className="text-xs text-stone-500">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
