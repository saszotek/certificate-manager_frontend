import axios from "axios";
import React, { useState } from "react";
import "../../styles/exportdata.scss";
import ButtonOne from "../Button/ButtonOne";
import { useLocalState } from "../../util/useLocalState";
import fileDownload from "js-file-download";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function ExportData() {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const exportCustomers = () => {
    axios
      .get("api/files/download/customers", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setIsError(false);
        fileDownload(response.data, "exported_customers.txt");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsError(true);
      });
  };

  return (
    <div className="export-data-container">
      <h1>Export data to the .txt file</h1>
      {isError && (
        <div className="export-data-container__error-box">
          <ErrorMessage text={errorMessage} />
        </div>
      )}
      <div className="export-data-container__button-box">
        <ButtonOne
          text="Export customers"
          onClick={exportCustomers}
          color="true"
        />
      </div>
    </div>
  );
}

export default ExportData;
