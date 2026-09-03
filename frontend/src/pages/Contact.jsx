import React, { useState } from 'react';
import { contactService } from '../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message or catering inquiry');
      return;
    }

    try {
      setLoading(true);
      const res = await contactService.submitContact(formData);
      setSuccessMessage(
        res.data?.message ||
          'Thank you for contacting Brindha Cloud Kitchen! Our culinary team will reach out shortly.'
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-1">
          Contact Brindha Cloud Kitchen
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Have questions about our ingredients, bulk party orders, catering, or a recent order? We are here to help.
        </p>
      </div>

      {/* Main Grid: Form + Business Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xs">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-orange-600" />
            <span>Send Us a Message</span>
          </h2>

          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Anand Kumar"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. anand@example.com"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Your Message *
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Let us know your inquiry, feedback, or party order requirements..."
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending to Kitchen...' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Business Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-stone-200 p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
            <h3 className="text-xl font-extrabold text-white">
              Cloud Kitchen Operations
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              We operate exclusively as a state-of-the-art delivery cloud kitchen hub equipped with thermal packing lines.
            </p>

            <div className="space-y-4 pt-2 border-t border-stone-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-orange-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                    Central Kitchen Hub
                  </h4>
                  <p className="text-sm font-medium text-white mt-0.5">
                    Hub 4, Commercial Road, Metro Zone, Anna Nagar, Chennai, Tamil Nadu - 600040
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-orange-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                    Phone & WhatsApp
                  </h4>
                  <p className="text-sm font-medium text-white mt-0.5">
                    +91 98765 43210 / +91 44 2618 9000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-orange-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                    Official Email
                  </h4>
                  <p className="text-sm font-medium text-white mt-0.5">
                    orders@brindhacloudkitchen.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-orange-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">
                    Operating Hours
                  </h4>
                  <p className="text-sm font-medium text-white mt-0.5">
                    Monday to Sunday: 11:00 AM – 11:00 PM
                  </p>
                  <span className="text-[11px] text-emerald-400 font-semibold block mt-1">
                    ● Kitchen currently open & taking orders
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk & Catering note */}
          <div className="bg-orange-50 border border-orange-200/80 p-6 rounded-2xl">
            <h4 className="font-bold text-orange-900 text-sm mb-1">
              Bulk Catering & Party Orders
            </h4>
            <p className="text-xs text-orange-800 leading-relaxed">
              Planning an office party, birthday celebration, or wedding gathering? Contact us 24 hours in advance for customized family dum pots and banquet meal trays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
