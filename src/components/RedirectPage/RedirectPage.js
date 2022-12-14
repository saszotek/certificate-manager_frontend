import React from "react";
import "../../styles/redirectpage.scss";
import ButtonOne from "../Button/ButtonOne";

function RedirectPage(props) {
  const { textHeader, textButton, action } = props;
  return (
    <div className="redirect-page-container">
      <h2>{textHeader}</h2>
      <ButtonOne text={textButton} onClick={action} color="true" />
    </div>
  );
}

export default RedirectPage;
