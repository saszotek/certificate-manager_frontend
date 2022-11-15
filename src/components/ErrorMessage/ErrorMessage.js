import React from "react";
import "../../styles/errormessage.scss";

function ErrorMessage(props) {
  return (
    <div className="error-container">
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
