import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Loader = ({ text = 'Preparing fresh dishes...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-orange-600">
          <UtensilsCrossed className="w-5 h-5 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-stone-600 tracking-wide">
        {text}
      </p>
    </div>
  );
};

export default Loader;
