import CheckboxInput from "./inputs/CheckboxInput";
import { useRestaurantState } from "../../../../context/RestaurantStateContext";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Cuisines() {
  const { cuisines, toggleCuisine } = useRestaurantState();
  const [availableCuisines, setAvailableCuisines] = useState([]);
  const { city } = useParams();

  const getCuisines = async () => {
    try {
      const response = await fetch(
        `https://tomato-backend-okwwd6qv3-sagarsantra1.vercel.app/api/restaurants/${city}?select=cuisine`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      let cuisines = [];
      data.forEach(({ cuisine }) => {
        cuisines = cuisines.concat(cuisine);
      });

      cuisines = cuisines.filter(
        (item, index, arr) => arr.indexOf(item) === index
      );

      setAvailableCuisines(cuisines);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCuisines();
  }, []);

  if (availableCuisines.length == 0) {
    return <div>Oops! We could not find any cuisines.</div>;
  }

  const handleCheckboxChange = (e) => {
    toggleCuisine(e.target.value);
  };

  return (
    <div className="flex flex-wrap justify-between">
      {availableCuisines &&
        availableCuisines.map((cuisine, index) => (
          <CheckboxInput
            key={index}
            value={cuisine}
            onChange={handleCheckboxChange}
            checked={cuisines.includes(cuisine)}
          />
        ))}
    </div>
  );
}

export default Cuisines;
