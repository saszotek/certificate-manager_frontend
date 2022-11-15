import React from "react";
import "../../styles/input.scss";

function Input(props) {
  const { type, id, value, onChange, label, minLength } = props;

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minLength={minLength}
        required
      />
    </div>
  );
}

export default Input;
