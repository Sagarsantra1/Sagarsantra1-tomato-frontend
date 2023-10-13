import React from "react";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import StepRangeInput from "./inputs/StepRangeInput";

const ratingToSelect = [0, 3.5, 4.0, 4.5, 5.0];

function Rating() {
  const { rating, changeRating } = useRestaurantState();

  const onChangeRating = (value) => {
    const selectedRating = ratingToSelect[value];
    changeRating(selectedRating);
  };

  const defaultValue = ratingToSelect.lastIndexOf(rating);

  return (
    <div className="p-5 space-y-24">
      <div>
        <h1 className="text-sm text-gray-400">Rating</h1>
        <span className="text-lg font-medium">
          {rating > 0 ? `${rating}+` : "Any"}
        </span>
      </div>
      <StepRangeInput
        min={0}
        max={4}
        step={1}
        defaultValue={defaultValue}
        onChange={onChangeRating}
      />
    </div>
  );
}

export default Rating;
