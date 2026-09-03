import React from 'react';
import { Sparkles, Utensils, Flame, Leaf, Coffee, Cake, Soup } from 'lucide-react';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Biryani', icon: Flame },
  { name: 'South Indian', icon: Utensils },
  { name: 'Chinese', icon: Soup },
  { name: 'Chicken', icon: Flame },
  { name: 'Vegetarian', icon: Leaf },
  { name: 'Desserts', icon: Cake },
  { name: 'Beverages', icon: Coffee },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2.5 min-w-max">
        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.name.toLowerCase();
          const Icon = cat.icon;

          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25 scale-102'
                  : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200/80 hover:border-orange-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
