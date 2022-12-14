import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import icons from "../../assets/icons/icons";
import "../../styles/loader.scss";

function Loader() {
  return (
    <div className="loader-container">
      <div>
        <FontAwesomeIcon icon={icons.faCertificate} />
      </div>
    </div>
  );
}

export default Loader;
