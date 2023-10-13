import React from "react";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import { BsXLg } from "react-icons/bs";

function AppliedFilters({ filterName }) {
  const { removeSingleFilter, addFilter } = useRestaurantState();

  const handleFilterRemoval = () => {
    removeSingleFilter(filterName);
  };

  return (
    <div
      className="w-fit bg-orange-500 text-white px-2 py-2 rounded-lg hover:bg-orange-600 cursor-pointer flex items-center"
      onClick={handleFilterRemoval}
    >
      {filterName}
      <BsXLg size={20} className="ml-3" aria-label="Remove Filter" />
    </div>
  );
}

export default AppliedFilters;
