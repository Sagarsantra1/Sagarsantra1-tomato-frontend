import React from "react";
import { Link } from "react-router-dom";

function RestaurantSearchResultCard({ image, name, cuisine, slug, city }) {
  return (
    <Link to={`/${city}/${slug}`} className="block hover:bg-gray-100">
      <div className="flex items-center p-2 space-x-5 cursor-pointer ">
        <div className="flex items-center justify-center h-20 w-20 rounded-lg overflow-hidden">
          {image && (
            <img
              className=" w-full h-full object-cover object-center"
              src={image}
              alt={`${name} image`}
              loading="lazy"
            />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-lg text-ellipsis line-clamp-1">{name}</h2>
          <h2 className="text-sm text-gray-500 text-ellipsis line-clamp-1">{cuisine.join(", ")}</h2>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantSearchResultCard;
