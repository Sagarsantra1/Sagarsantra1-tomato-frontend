import React, { useState, useEffect, createContext, useContext } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import queryString from "query-string";

// Create a context to hold the restaurant state and functions
const RestaurantStateContext = createContext();

// Provider component for the restaurant state context
export const RestaurantStateProvider = ({ children }) => {
  // Default filter values
  const defaultFilter = {
    SortBy: "Popularity",
    Cuisines: [],
    Rating: 0,
    CostPerPerson: { min: 0, max: Infinity },
  };
  const sortByList = {
    Popularity: {},
    "Rating: High to Low": { sort: "rating", order: "-1" },
    "Delivery Time": { sort: "deliveryTime", order: "1" },
    "Cost: Low to High": { sort: "costPerPerson", order: "1" },
    "Cost: High to Low": { sort: "costPerPerson", order: "-1" },
  };

  function findKeyBySortAndOrder(sort, order) {
    for (const key in sortByList) {
      if (sortByList[key].sort === sort && sortByList[key].order === order) {
        return key;
      }
    }
    return null; // Return null if no matching key is found
  }

  const location = useLocation();
  let queryParams = queryString.parse(location.search);
  const foundKey = findKeyBySortAndOrder(queryParams.sort, queryParams.order);
  const [searchParams, setSearchParams] = useSearchParams();

  // State variables to manage various filters and data
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [sortBy, setSortBy] = useState(foundKey ? foundKey : "Popularity");
  const [cuisines, setCuisines] = useState(
    queryParams.cuisine
      ? Array.isArray(queryParams.cuisine)
        ? [...queryParams.cuisine]
        : [queryParams.cuisine]
      : []
  );
  const [rating, setRating] = useState(
    queryParams.rating ? queryParams.rating : 0
  );
  const [costPerPerson, setCostPerPerson] = useState({
    min: queryParams.CostPerPersonmin ? queryParams.CostPerPersonmin : 0,
    max: queryParams.CostPerPersonmax ? queryParams.CostPerPersonmax : Infinity,
  });

  const changeSortBy = (value) => {
    setSortBy(value);
  };

  const changeCostPerPerson = (min, max) => {
    setCostPerPerson({
      min: min,
      max: max,
    });
  };

  const toggleCuisine = (value) => {
    if (cuisines.includes(value)) {
      setCuisines((prevCuisines) =>
        prevCuisines.filter((cuisine) => cuisine !== value)
      );
    } else {
      setCuisines((prevCuisines) => [...prevCuisines, value]);
    }
  };

  const changeRating = (value) => {
    setRating(value);
  };
  const updateSearchParams = (value) => {
    const newSearchParams = { ...queryParams };
    for (const key in value) {
      delete newSearchParams[key];
    }
    setSearchParams({ ...newSearchParams, ...value }, { replace: true });
  };

  const removeSingleSearchParams = (...keys) => {
    const newSearchParams = { ...queryParams };
    for (let index = 0; index < keys.length; index++) {
      delete newSearchParams[keys[index]];
    }
    setSearchParams({ ...newSearchParams }, { replace: true });
  };

  // Function to apply filters and update filtered restaurant list
  const addFilter = () => {
    // Update applied filters list
    let removedDefault = [];
    if (sortBy != defaultFilter.SortBy) {
      if (
        queryParams.order != sortByList[sortBy].order ||
        queryParams.sort != sortByList[sortBy].sort
      ) {
        updateSearchParams(sortByList[sortBy]);
      }
      removedDefault.push(`SortBy: ${sortBy}`);
    }
    if (rating !== defaultFilter.Rating) {
      if (queryParams.rating != rating) {
        updateSearchParams({ rating: rating });
      }
      removedDefault.push(`Rating: ${rating}+`);
    }
    if (
      costPerPerson.max !== defaultFilter.CostPerPerson.max ||
      costPerPerson.min !== defaultFilter.CostPerPerson.min
    ) {
      if (
        queryParams.CostPerPersonmin != costPerPerson.min ||
        queryParams.CostPerPersonmax != costPerPerson.max
      ) {
        updateSearchParams({
          CostPerPersonmin: costPerPerson.min,
          CostPerPersonmax: costPerPerson.max,
        });
      }

      removedDefault.push(
        `Cost ₹${costPerPerson.min} - ₹${
          costPerPerson.max > 1000 ? "Any" : costPerPerson.max
        }`
      );
    }
    if (cuisines.length > 0) {
      if (!queryParams.cuisine) {
        updateSearchParams({ cuisine: cuisines });
      } else {
        cuisines.map((cuisine) => {
          if (!queryParams.cuisine.includes(cuisine)) {
            updateSearchParams({ cuisine: cuisines });
          }
        });
      }
      removedDefault = [...removedDefault, ...cuisines];
    }

    setAppliedFilters(removedDefault);
  };

  // Function to remove all filters and reset to default values
  const removeFilter = () => {
    setSortBy(defaultFilter.SortBy);
    setCuisines(defaultFilter.Cuisines);
    setRating(defaultFilter.Rating);
    setCostPerPerson(defaultFilter.CostPerPerson);
    setAppliedFilters([]);
    setSearchParams({});
  };

  const removeSingleFilter = (filter) => {
    if (filter.includes("SortBy")) {
      changeSortBy(defaultFilter.SortBy);
      removeSingleSearchParams("sort", "order");
    } else if (filter.includes("Rating")) {
      setRating(defaultFilter.Rating);
      removeSingleSearchParams("rating");
    } else if (filter.includes("Cost")) {
      setCostPerPerson(defaultFilter.CostPerPerson);
      removeSingleSearchParams("CostPerPersonmin", "CostPerPersonmax");
    } else if (cuisines.includes(filter)) {
      let cuisine = queryParams.cuisine;
      if (Array.isArray(cuisine)) {
        cuisine = cuisine.filter((cuisine) => cuisine !== filter);
        updateSearchParams({ cuisine: cuisine });
      } else {
        removeSingleSearchParams("cuisine");
      }
      toggleCuisine(filter);
    }

    setAppliedFilters((prev) =>
      prev.filter((prevFilter) => prevFilter !== filter)
    );
  };

  useEffect(() => {
    addFilter();
  }, []);

  useEffect(() => {
    queryParams = queryString.parse(location.search);
  }, [searchParams]);

  // Provide the state and functions through the context
  return (
    <RestaurantStateContext.Provider
      value={{
        isModelOpen,
        setIsModelOpen,
        sortBy,
        changeSortBy,
        rating,
        changeRating,
        cuisines,
        toggleCuisine,
        costPerPerson,
        changeCostPerPerson,
        addFilter,
        removeFilter,
        appliedFilters,
        removeSingleFilter,
      }}
    >
      {children}
    </RestaurantStateContext.Provider>
  );
};

// Custom hook to consume the restaurant state context
export const useRestaurantState = () => useContext(RestaurantStateContext);
