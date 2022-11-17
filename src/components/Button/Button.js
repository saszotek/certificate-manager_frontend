import React from "react";
import "../../styles/button.scss";

function Button(props) {
  const { type, id, onClick, text, color } = props;

  return (
    <button
      className={!color ? `button-custom` : `button-custom-blue`}
      type={type}
      id={id}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
