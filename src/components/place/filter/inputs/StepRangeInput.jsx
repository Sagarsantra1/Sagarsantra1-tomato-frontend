import React, { useState } from "react";
import "./StepRangeInput.css";

function StepRangeInput({ min, max, step, defaultValue, onChange }) {
  const [progress, setprogress] = useState((defaultValue / max) * 100);
  const [value, setValue] = useState(defaultValue);

  const showprogress = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
    const newPercent = (newValue / max) * 100;
    setprogress(newPercent);
    setValue(e.target.value);
  };

  return (
    <>
      <div className="range">
        <input
          id="steps-range"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={showprogress}
          style={{
            background: `linear-gradient(to right,rgb(209 213 219) ${progress}%, rgb(249 115 22) ${progress}%)`,
          }}
        />
        <div className="sliderticks">
          <span>Any</span>
          <span>3.5</span>
          <span>4.0</span>
          <span>4.5</span>
          <span>5.0</span>
        </div>
      </div>
    </>
  );
}

export default StepRangeInput;
