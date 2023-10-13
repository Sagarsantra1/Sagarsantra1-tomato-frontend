import LocationCard from "../components/home/LocationCard";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

function HomePage() {

  const getCities = async () => {
      const response = await fetch("https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/cities");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, error, isLoading } = useQuery("cities", getCities);

  if (isLoading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <div className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          className="-z-10 absolute top-0 h-full w-full object-cover"
          alt="Background"
        />
        <div className="flex flex-col items-center justify-center text-white text-center p-2 w-full sm:w-1/2 space-y-5">
          <h1 className="text-7xl font-bold">Tomato</h1>
          <p className="text-4xl">
            Find the best restaurants, cafés and bars in India
          </p>
        </div>
      </div>
      <section className="flex flex-col items-center justify-center my-10">
        <div className="flex flex-col items-center justify-center p-2 w-full sm:w-2/3 text-center space-y-5">
          <h1 className="text-4xl">Popular locations in India</h1>
          <p className="text-xl text-gray-500">
            From swanky upscale restaurants to the cosiest hidden gems serving
            the most incredible food, Tomato covers it all. Explore menus, and
            millions of restaurant photos and reviews from users just like you,
            to find your next great meal.
          </p>
        </div>
      </section>
      <section className="flex items-start justify-start flex-wrap px-2 sm:px-20">
        {data &&
          data.map((city) => (
            <LocationCard key={city._id} cityName={city.name} slug={city.slug} />
          ))}
      </section>
    </>
  );
}

export default HomePage;
