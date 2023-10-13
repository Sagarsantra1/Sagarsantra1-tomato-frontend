import React from "react";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import RadioInput from "./inputs/RadioInput";

const sortingOptions = [
  { value: "Popularity", label: "Popularity" },
  { value: "Rating: High to Low", label: "Rating: High to Low" },
  { value: "Delivery Time", label: "Delivery Time" },
  { value: "Cost: Low to High", label: "Cost: Low to High" },
  { value: "Cost: High to Low", label: "Cost: High to Low" },
];

function SortBy() {
  const { changeSortBy, sortBy } = useRestaurantState();

  const handleOnChange = (selectedOption) => {
    changeSortBy(selectedOption);
  };

  return (
    <div className="flex flex-col gap-5">
      {sortingOptions.map((option) => (
        <RadioInput
          key={option.value}
          value={option.value}
          label={option.label}
          checked={sortBy === option.value}
          onChange={() => handleOnChange(option.value)}
        />
      ))}
    </div>
  );
}

export default SortBy;
