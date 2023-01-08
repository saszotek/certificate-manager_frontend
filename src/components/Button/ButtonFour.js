import React from "react";
import "../../styles/buttonfour.scss";

function ButtonFour(props) {
  const { onClick, text } = props;

  return (
    <button className="button-custom-four" onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonFour;
