import { FaMapMarkerAlt, FaCaretDown, FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RestaurantSearchResults from "./RestaurantSearchResults";
import CitySearchResults from "./CitySearchResults";

function HeaderSearch() {
  const location = useLocation();
  const city = location.pathname.split("/")[1];
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [showLocationResult, setShowLocationResult] = useState(false);

  const toggleIsSearchOpen = () => {
    setIsSearchOpen((prevIsSearchOpen) => !prevIsSearchOpen);
  };

  const toggleShowSearchResult = () => {
    setShowSearchResult((prevShowSearchResult) => !prevShowSearchResult);
    setShowLocationResult(false);
  };

  const toggleShowLocationResult = () => {
    setShowLocationResult((prevShowLocationResult) => !prevShowLocationResult);
    setShowSearchResult(false);
  };

  const searchOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const locationOnChange = (e) => {
    setLocationQuery(e.target.value);
  };


  return (
    <div className="w-full h-full flex sm:border border-gray-300 sm:shadow-lg rounded-lg justify-end sm:justify-between sm:space-x-3">
      {/* Location Search */}
      <div
        className="w-2/3 sm:w-40 flex items-center space-x-1 relative"
        onClick={toggleShowLocationResult}
      >
        <FaMapMarkerAlt size={20} className="text-orange-400 cursor-pointer" onClick={toggleIsSearchOpen}/>
        <input
          className={`flex-1 overflow-hidden focus:outline-none sm:block ${
            !isSearchOpen ? " " : "w-0"
          } transition-all ease-in-out duration-300 cursor-pointer`}
          type="text"
          placeholder={city}
          onChange={locationOnChange}
        />
        <FaCaretDown
          size={20}
          className={`text-gray-500 hidden sm:block ${
            showLocationResult ? "rotate-180 " : ""
          } transition-all ease-in-out duration-300 cursor-pointer`}
        />
        {/* Location Search Results */}
        <div
          className={`w-80 ${
            showLocationResult ? "h-fit border" : "h-0"
          } max-h-96 overflow-y-scroll absolute top-14 -right-20 sm:left-0 rounded-lg bg-white  border-gray-300 z-50`}
        >
          {<CitySearchResults query={locationQuery}/>}
        </div>
      </div>

      {/* Restaurant Search */}
      <div
        className="flex items-center space-x-1 sm:flex-1 relative"
        onClick={toggleShowSearchResult}
      >
        <FaSearch
          onClick={toggleIsSearchOpen}
          className="pl-2 text-gray-500 cursor-pointer border-l border-gray-500"
          size={25}
        />
        <input
          onChange={searchOnChange}
          className={`overflow-hidden focus:outline-none sm:flex-1 ${
            isSearchOpen ? "w-40" : "w-0"
          } transition-all ease-in-out duration-300 sm:block`}
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
        />
        {/* Restaurant Search Results */}
        <div
          className={`w-80 sm:w-full ${
            searchQuery.length > 1 && showSearchResult ? "h-fit border" : "h-0"
          } max-h-96 overflow-y-scroll absolute top-14 -right-10 sm:right-0 rounded-lg bg-white  border-gray-300 z-50`}
        >
          {<RestaurantSearchResults query={searchQuery} city={city} setShowSearchResult={setShowSearchResult}/>}
        </div>
      </div>
    </div>
  );
}

export default HeaderSearch;
