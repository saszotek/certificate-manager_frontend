import React from "react";
import "../../styles/input.scss";

function Input(props) {
  const { type, id, value, onChange, label } = props;

  return (
    <div className="input-container">
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
