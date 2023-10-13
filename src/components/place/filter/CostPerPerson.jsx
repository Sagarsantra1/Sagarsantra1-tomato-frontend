import React, { useState, useEffect } from "react";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import DoubleRangeInput from "./inputs/DoubleRangeInput";

const priceToSelect = [0, 100, 200, 400, 600, 1000, Infinity];

function CostPerPerson() {
  const { costPerPerson, changeCostPerPerson } = useRestaurantState();

  const [min, setMin] = useState(costPerPerson.min);
  const [max, setMax] = useState(costPerPerson.max);

  const handleMinChange = (value) => {
    setMin(priceToSelect[value]);
  };

  const handleMaxChange = (value) => {
    setMax(priceToSelect[value]);
  };

  useEffect(() => {
    changeCostPerPerson(min, max);
  }, [min, max]);

  return (
    <div className="p-5 space-y-24">
      <div>
        <h1 className="text-sm text-gray-400">Cost per person</h1>
        <span className="text-lg font-medium">
          ₹{min} - ₹{max > 1000 ? "Any" : max}
        </span>
      </div>
      <DoubleRangeInput
        min={0}
        max={6}
        step={1}
        onChangeMin={handleMinChange}
        onChangeMax={handleMaxChange}
        minDefaultValue={priceToSelect.lastIndexOf(costPerPerson.min)}
        maxDefaultValue={priceToSelect.lastIndexOf(costPerPerson.max)}
        minvalue={min}
        maxvalue={max}
      />
    </div>
  );
}

export default CostPerPerson;
