import React from "react";
import "../../styles/input.scss";

function Input(props) {
  const { type, id, value, onChange, label, altColor } = props;

  return (
    <div
      className={
        !altColor ? "input-container" : "input-container alternative-color"
      }
    >
      <label>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
