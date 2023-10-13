import { useEffect, useState } from "react";
import RestaurantSearchResultCard from "./RestaurantSearchResultCard";

function RestaurantSearchResults({ query, city,setShowSearchResult }) {
  const [searchQueryResult, setSearchQueryResult] = useState([]);
  const select = "name,slug,cuisine,restaurantImage";

  const getRestaurents = async () => {
    try {
      const response = await fetch(
        `https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/Restaurants/${city}?select=${select}&q=${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchQueryResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (query.length > 1) {
      getRestaurents();
      setShowSearchResult(true);
    } else {
      setShowSearchResult(false);
      setSearchQueryResult([]);
    }
  }, [query]);

  if (searchQueryResult.length === 0) {
    return (
      <div className="text-gray-400 h-24 w-full flex flex-col items-start justify-center p-2">
        <h2>Oops!</h2>
        <h2 className="text-base">
          We could not understand what you mean, try rephrasing the query.
        </h2>
      </div>
    );
  }

  return searchQueryResult.map((item) => (
    <RestaurantSearchResultCard
      key={item._id}
      name={item.name}
      image={item.restaurantImage}
      cuisine={item.cuisine}
      slug={item.slug}
      city={city}
    />
  ));
}

export default RestaurantSearchResults;
