import React from 'react';

export default function Topbar({ sortOption, setSortOption }) {
  return (
    <div className=''>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="shadow-lg bg-gray-200  rounded text-sm p-2"
      >
        <option value="featured">Sort By: Featured</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="lowToHigh">Price: Low to High</option>
      </select>
    </div>
  );
}
