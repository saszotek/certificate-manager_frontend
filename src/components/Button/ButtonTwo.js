import React from "react";
import "../../styles/buttontwo.scss";

function ButtonTwo(props) {
  const { type, id, onClick, text, state } = props;

  return (
    <button
      className={`button-custom-two ${
        state ? " button-custom-two-active" : ""
      }`}
      type={type}
      id={id}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonTwo;
