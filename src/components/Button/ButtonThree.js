import React from "react";
import "../../styles/buttonthree.scss";

function ButtonThree(props) {
  const { type, id, onClick, text, state } = props;

  return (
    <button
      className="button-custom-three"
      type={type}
      id={id}
      onClick={onClick}
      state={state}
    >
      {text}
    </button>
  );
}

export default ButtonThree;
