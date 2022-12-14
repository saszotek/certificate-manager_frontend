import React from "react";
import "../../styles/buttonone.scss";

function ButtonOne(props) {
  const { type, id, onClick, text, color } = props;

  return (
    <button
      className={!color ? `button-custom-one` : `button-custom-one-blue`}
      type={type}
      id={id}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonOne;
