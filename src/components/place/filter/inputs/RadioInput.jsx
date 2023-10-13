import "./RadioInput.css"
function RadioInput({value, checked, onChange}) {
  return (
    <label htmlFor={value}>
      <input
        type="radio"
        name="sortOption"
        value={value}
        className="w-5 h-5 radio-input relative left-3 top-1 opacity-0 cursor-pointer   z-10"
        onChange={onChange}
        checked={checked}
      />
      <span className="custom-radio hover:border-orange-500">   </span>
      {value}
    </label>
  );
}

export default RadioInput;
