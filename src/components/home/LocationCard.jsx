import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function LocationCard({ cityName, slug }) {
  return (
    <Link
      to={`/${slug}`}
      className="sm:w-1/4  w-2/5 h-16 border border-gray-300 rounded-lg hover:shadow-xl flex items-center justify-between px-5 mx-4 my-4"
    >
      <span className="text-lg font-semibold">{cityName}</span>
      <FaAngleRight />
    </Link>
  );
}

export default LocationCard;
