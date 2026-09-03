import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { foodService } from '../services/api';
import FoodCard from '../components/FoodCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { RefreshCw, AlertCircle, UtensilsCrossed } from 'lucide-react';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync category if URL searchParams changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }

      const res = await foodService.getAllFoods(params);
      if (res.data?.data) {
        setFoods(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching foods:', err);
      setError(err.message || 'Failed to load menu items from the kitchen server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly for optimal responsiveness
    const timer = setTimeout(() => {
      fetchFoods();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
          Fresh From Our Kitchen
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 mt-1">
          Our Authentic Menu
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Prepared hot to order with pure hand-ground spices and farm-fresh ingredients. Choose your favorites and enjoy fast doorstep delivery.
        </p>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search by dish name, biryani, chicken, paneer, dessert..."
        />

        {/* Category Pills */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 text-sm text-stone-600">
        <p>
          Showing <span className="font-bold text-stone-900">{foods.length}</span> dishes in{' '}
          <span className="font-semibold text-orange-600">{selectedCategory}</span>
          {searchQuery && (
            <span>
              {' '}
              matching "<span className="font-medium text-stone-800">{searchQuery}</span>"
            </span>
          )}
        </p>
        <button
          onClick={fetchFoods}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-orange-600 cursor-pointer"
          title="Refresh menu"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Content State: Loading, Error, Empty, or Food Grid */}
      {loading ? (
        <Loader text="Fetching the freshest dishes from Brindha Cloud Kitchen..." />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-red-800">Unable to load menu</h3>
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchFoods}
            className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-xs transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : foods.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-stone-900">No dishes found</h3>
          <p className="text-sm text-stone-500">
            We couldn't find any dishes matching your criteria. Try adjusting your search query or choosing another category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              handleCategorySelect('All');
            }}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm shadow-xs transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
