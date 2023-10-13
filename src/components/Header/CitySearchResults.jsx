import { useEffect, useState } from "react";
import CitySearchResultsCard from "./CitySearchResultsCard";

function CitySearchResults({ query }) {
  const [cities, setCities] = useState([]);
  const [searchQueryResult, setSearchQueryResult] = useState([]);

  const getCities = async () => {
    try {
      const response = await fetch("https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/cities");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const searchCities = () => {
    let QueryResult = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchQueryResult(QueryResult);
  };
  useEffect(() => {
    getCities();
  }, []);
  useEffect(() => {
    searchCities();
  }, [query]);

  useEffect(() => {
    setSearchQueryResult(cities);
  }, [cities]);

  if (searchQueryResult.length === 0) {
    return (
      <div className="text-gray-400 h-24 w-full flex flex-col items-start justify-center p-2">
        <h2 className="text-base">
          Oops! We could not find any city maching the query, try rephrasing the
          query.
        </h2>
      </div>
    );
  }

  return searchQueryResult.map((item) => (
    <CitySearchResultsCard key={item._id} city={item.slug} name={item.name} />
  ));
}

export default CitySearchResults;
