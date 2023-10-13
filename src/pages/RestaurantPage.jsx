import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { RestaurantStateProvider } from "../../context/RestaurantStateContext";
import RestaurantCard from "../components/place/RestaurantCard";
import FilterBar from "../components/place/filter/FilterBar";

function RestaurantPage() {
  const { city } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search).toString();
  const select =
    "name,slug,cuisine,deliveryTime,restaurantImage,rating,costPerPerson";

  const getRestaurents = async () => {
    const response = await fetch(
      `https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/restaurants/${city}?select=${select}&${queryParams}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, error, isLoading } = useQuery(["restaurents",city,select,queryParams], getRestaurents);

  if (isLoading) return <div>'Loading...'</div>;

  if (error) return <div>`Error: ${error.message}`</div>;

  return (
    <div className="px-4 sm:px-20">
      <FilterBar />
      <h1 className="text-3xl font-medium">Best Food in Kolkata</h1>
      <div className="flex flex-wrap w-full h-fit justify-center">
        {data.length > 0 ? (
          data.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <div>No restaurents found </div>
        )}
      </div>
    </div>
  );
}

export default function RestaurantPageWithProvider() {
  return (
    <RestaurantStateProvider>
      <RestaurantPage />
    </RestaurantStateProvider>
  );
}
