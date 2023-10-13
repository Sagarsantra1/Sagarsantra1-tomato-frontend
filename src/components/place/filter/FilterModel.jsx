import React, { useState } from "react";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import Cuisines from "./Cuisines";
import Rating from "./Rating";
import SortBy from "./SortBy";
import { LuX } from "react-icons/lu";
import CostPerPerson from "./CostPerPerson";

const filterComponents = {
  "Sort by": <SortBy />,
  Cuisines: <Cuisines />,
  Rating: <Rating />,
  "Cost per person": <CostPerPerson />,
};

function FilterModel() {
  const { setIsModelOpen, addFilter, removeFilter } = useRestaurantState();
  const [filterType, setFilterType] = useState("Sort by");

  const handleFilterTypeChange = (selectedFilter) => {
    setFilterType(selectedFilter);
  };

  const handleApply = () => {
    addFilter();
    setIsModelOpen(false);
  };

  const handleClearAll = () => {
    removeFilter();
    setIsModelOpen(false);
  };

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center h-screen w-screen bg-black bg-opacity-70 p-5 lg:px-72 md:py-5 overflow-hidden max-w-full">
      <div
        className="absolute top-0 left-0 blur-0 right-0 h-screen w-screen z-50"
        onClick={() => {
          setIsModelOpen(false);
        }}
      ></div>
      <div className="bg-white h-full w-full rounded-lg flex flex-col z-50">
      <div className="py-5 border-b border-gray-600 h-1/6 flex justify-between px-2 pr-8">
          <h1 className="text-3xl">Filters</h1>
          <button
            onClick={() => {
              setIsModelOpen(false);
            }}
          >
            <LuX size={25}/>
          </button>
        </div>        <div className="h-4/6  flex">
          <div className="h-full w-1/3 md:w-1/4 bg-gray-100 space-y-2">
            {Object.keys(filterComponents).map((filterName) => (
              <div
                key={filterName}
                className={`${
                  filterType === filterName ? "bg-white" : ""
                } flex items-center p-2 cursor-pointer h-1/6`}
                onClick={() => handleFilterTypeChange(filterName)}
              >
                {filterName}
              </div>
            ))}
          </div>
          <div className="w-3/4 p-3 pt-5 ">
            {filterComponents[filterType]}
          </div>
        </div>
        <div className="p-5 border-t border-gray-600 h-1/6 flex items-center justify-end">
          <button
            className="px-4 py-2 w-28 hover:bg-gray-300 rounded-lg flex items-center justify-center border"
            onClick={handleClearAll}
          >
            Clear all
          </button>
          <button
            className="px-4 py-2 w-28 bg-orange-400 hover:bg-orange-500 rounded-lg flex items-center justify-center m-2"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModel;
