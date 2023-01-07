import axios from "axios";
import React, { useState } from "react";
import "../../styles/exportdata.scss";
import ButtonOne from "../Button/ButtonOne";
import { useLocalState } from "../../util/useLocalState";
import fileDownload from "js-file-download";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import createReminders from "../../util/createReminders";

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

  const exportReminders = async () => {
    await axios
      .get("api/certificate/find/all/serial/and/valid", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setIsError(false);
        fileDownload(createReminders(response.data), "reminders.ics");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsError(true);
      });
  };

  return (
    <div className="export-data-container">
      <h1>Export data</h1>
      {isError && (
        <div className="export-data-container__error-box">
          <ErrorMessage text={errorMessage} />
        </div>
      )}
      <div className="export-data-container__button-box">
        <div className="export-data-container__button-box__item">
          <ButtonOne
            text="Export customers"
            onClick={exportCustomers}
            color="true"
          />
        </div>
        <div className="export-data-container__button-box__item">
          <ButtonOne
            text="Export all reminders"
            onClick={exportReminders}
            color="true"
          />
        </div>
      </div>
    </div>
  );
}

export default ExportData;
