// TaskFilters.jsx
import React from "react";

function TaskFilters({ sortBy, setSortBy, categoryFilter, setCategoryFilter }) {
  return (
    <div className="space-y-4"> {/* Vertical space between filters */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="priorityHigh">Priority (High to Low)</option>
          <option value="priorityLow">Priority (Low to High)</option>
          <option value="dueDateAsc">Due Date (Ascending)</option>
          <option value="dueDateDesc">Due Date (Descending)</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilters;