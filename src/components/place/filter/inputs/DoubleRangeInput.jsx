import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DoubleRangeInput.css";

function DoubleRangeInput({
  min,
  max,
  step,
  onChangeMin,
  onChangeMax,
  minDefaultValue,
  maxDefaultValue,
  minvalue,
  maxvalue,
}) {
  const [value1, setValue1] = useState(minDefaultValue);
  const [value2, setValue2] = useState(maxDefaultValue);
  const [percent1, setPercent1] = useState((minDefaultValue / max) * 100);
  const [percent2, setPercent2] = useState((maxDefaultValue / max) * 100);

  const handleSlider1Change = (e) => {
    const newValue1 = parseFloat(e.target.value);
    setValue1(newValue1);

    const newPercent1 = (newValue1 / max) * 100;
    setPercent1(newPercent1);

    if (value2 - newValue1 <= step) {
      const newValue1Adjusted = value2 - step;
      setValue1(newValue1Adjusted);
      setPercent1((newValue1Adjusted / max) * 100);
      onChangeMin(newValue1Adjusted);
    } else {
      onChangeMin(newValue1);
    }
  };

  const handleSlider2Change = (e) => {
    const newValue2 = parseFloat(e.target.value);
    setValue2(newValue2);

    const newPercent2 = (newValue2 / max) * 100;
    setPercent2(newPercent2);

    if (newValue2 - value1 <= step) {
      const newValue2Adjusted = value1 + step;
      setValue2(newValue2Adjusted);
      setPercent2((newValue2Adjusted / max) * 100);
      onChangeMax(newValue2Adjusted);
    } else {
      onChangeMax(newValue2);
    }
  };

  return (
    <div className="double-range-container">
      <div
        className="slider-track"
        style={{
          background: `linear-gradient(to right, rgb(209 213 219) ${percent1}% , rgb(249 115 22) ${percent1}% , rgb(249 115 22) ${percent2}%, rgb(209 213 219) ${percent2}%)`,
        }}
      ></div>
      <div className="relative bubbleContainer">
        <div
          className="bubble absolute"
          style={{ left: `${percent1 - percent1 / 6}%` }}
        >
          ₹{minvalue}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value1}
          id="slider-1"
          onChange={handleSlider1Change}
          className="slider"
          aria-label="Minimum Value Slider"
        />
      </div>
      <div className="relative bubbleContainer">
        <div
          className="bubble absolute"
          style={{ left: `${percent2 - percent2 / 10}%` }}
        >
          ₹{maxvalue > 1000 ? "Any" : maxvalue}
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value2}
          id="slider-2"
          onChange={handleSlider2Change}
          className="slider"
          aria-label="Maximum Value Slider"
        />
      </div>
    </div>
  );
}

// Prop type validation
DoubleRangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  minDefaultValue: PropTypes.number.isRequired,
  maxDefaultValue: PropTypes.number.isRequired,
  onChangeMin: PropTypes.func.isRequired,
  onChangeMax: PropTypes.func.isRequired,
  minvalue: PropTypes.number.isRequired,
  maxvalue: PropTypes.number.isRequired,
};

export default DoubleRangeInput;
