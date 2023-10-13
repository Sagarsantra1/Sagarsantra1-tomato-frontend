import React from "react";
import FilterModel from "./FilterModel";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import AppliedFilters from "./AppliedFilters";
import { BsFilter } from "react-icons/bs";

function FilterBar() {
  const { isModelOpen, setIsModelOpen, appliedFilters } =
    useRestaurantState();

  const handleFilterModelOpen = () => {
    setIsModelOpen(true);
  };

  return (
    <div className="w-full h-fit p-2 flex text-sm flex-wrap gap-2">
      <button
        className="border border-gray-400 px-2 py-2 h-10 rounded-lg w-fit hover:bg-gray-100 cursor-pointer flex items-center"
        onClick={handleFilterModelOpen}
      >
        {appliedFilters.length > 0 ? (
          <div className="w-5 h-6 flex items-center justify-center bg-orange-500 rounded-md mr-1 text-white">
            {appliedFilters.length}
          </div>
        ) : (
          <BsFilter size={20} />
        )}
        Filters
      </button>
      {appliedFilters.map((filterName, index) => (
        <AppliedFilters key={index} filterName={filterName} />
      ))}
      {isModelOpen && <FilterModel />}
    </div>
  );
}

export default FilterBar;
