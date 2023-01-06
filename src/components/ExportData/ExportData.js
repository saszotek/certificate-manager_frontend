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
  const [dataReminders, setDataReminders] = useState([]);

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
    try {
      const result = await axios.get(
        "api/certificate/find/all/serial/and/valid",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (result.data.length > 0) {
        setIsError(false);
        setDataReminders(result.data);
        fileDownload(createReminders(), "reminders.ics");
      }
    } catch (error) {
      setErrorMessage(error.response.data);
      setIsError(true);
    }

    // await axios
    //   .get("api/certificate/find/all/serial/and/valid", {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${jwt}`,
    //     },
    //   })
    //   .then((response) => {
    //     setIsError(false);
    //     setDataReminders(response.data);
    //     fileDownload(createReminders(), "reminders.ics");
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.response.data);
    //     setIsError(true);
    //   });
  };

  const createReminders = () => {
    const ics = require("ics");

    const { error, value } = ics.createEvents(generateEvents());

    if (error) {
      console.log(error);
      setErrorMessage(error.errors);
      setIsError(true);
      return;
    }

    console.log(value);

    return value;
  };

  const generateEvents = () => {
    let eventsArray = [];

    dataReminders.forEach((item) => {
      let event = {
        title: `Serial number: ${item[0]}`,
        start: setStartEvent(item[1]),
        duration: { hours: 1 },
        alarms: [
          {
            action: "display",
            description: "Reminder",
            trigger: { hours: 24, minutes: 0, before: true },
          },
          {
            action: "display",
            description: "Reminder",
            trigger: { hours: 72, minutes: 0, before: true },
          },
          {
            action: "display",
            description: "Reminder",
            trigger: { hours: 168, minutes: 0, before: true },
          },
          {
            action: "display",
            description: "Reminder",
            trigger: { hours: 336, minutes: 0, before: true },
          },
        ],
      };

      eventsArray.push(event);
    });

    return eventsArray;
  };

  const setStartEvent = (date) => {
    const newDate = new Date(date);

    return [
      newDate.getUTCFullYear(),
      newDate.getUTCMonth() + 1,
      newDate.getDate(),
      newDate.getUTCHours(),
      newDate.getUTCMinutes(),
    ];
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
            text="Export reminders"
            onClick={exportReminders}
            color="true"
          />
        </div>
      </div>
    </div>
  );
}

export default ExportData;
