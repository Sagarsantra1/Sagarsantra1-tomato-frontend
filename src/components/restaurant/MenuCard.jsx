import React from "react";

function MenuCard({ item }) {
  const { name, price, image, description } = item;

  return (
    <div className="flex items-center h-32 gap-4 mt-4 w-full">
      <img className="h-32 w-32 rounded-xl max-w-lg" src={image} alt={name} loading="lazy"/>
      <div className="h-full overflow-hidden text-sm text-gray-500">
        <div className="text-lg font-semibold">{name}</div>
        <div>⭐⭐⭐⭐⭐</div>
        <div>${price}</div>
        <p className="flex flex-wrap">{description}</p>
      </div>
    </div>
  );
}

export default MenuCard;
