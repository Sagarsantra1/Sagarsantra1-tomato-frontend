import React from "react";
import { Link, useParams  } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";

function RestaurantCard({ restaurant }) {
  const { name, slug, cuisine, deliveryTime, restaurantImage, rating,costPerPerson } = restaurant;
  const { city } = useParams();


  return (
    <Link to={`/${city}/${slug}`}>
      <div className="m-4 rounded-lg overflow-hidden hover:shadow-gray-300 hover:shadow-lg group h-72 w-72">
        <div className="overflow-hidden h-2/3 flex justify-center items-center p-2">
          <div className="w-full h-full overflow-hidden rounded-lg">
            {restaurantImage && (
              <img
                className="w-full h-full object-center"
                src={restaurantImage}
                alt={`Image of ${name} restaurant`}
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="p-2 h-1/3 flex justify-between text-sm">
          <div className="w-2/3">
            <h1 className="title-font text-base font-medium text-black text-ellipsis line-clamp-1">
              {name}
            </h1>
            <h2 className="tracking-widest font-normal text-gray-500 text-ellipsis line-clamp-1 text-sm">
              {cuisine.join(", ")}
            </h2>
          </div>
          <div className="flex flex-col justify-between items-end w-1/3">
            <div className="bg-green-600 text-center rounded-md text-white w-fit flex items-center px-1 gap-1">
              {rating} <BsStarFill size={12} />
            </div>
            <div className="text-gray-400 text-ellipsis line-clamp-1">
              {`₹${costPerPerson} for one`}
            </div>
            <div>{deliveryTime} min</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
