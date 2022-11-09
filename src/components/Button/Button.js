import React from "react";
import "../../styles/button.scss";

function Button(props) {
  const { type, id, onClick, text } = props;

  return (
    <button className="button-custom" type={type} id={id} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
