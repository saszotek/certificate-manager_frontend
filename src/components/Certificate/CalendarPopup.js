import React, { useState } from "react";
import "../../styles/calendarpopup.scss";
import setDateTime from "../../util/setDateTime";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonOne from "../Button/ButtonOne";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";

function CalendarPopup(props) {
  const { handleCalendarPopup, expiryDate, certificateId, setValidTo } = props;

  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleConfirm = async () => {
    const dateIso = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    ).toISOString();

    const reqBody = {
      validTo: dateIso,
    };

    await axios
      .put(`/api/certificate/update/${certificateId}/expiration`, reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response);
        setValidTo(selectedDate);
      })
      .catch((error) => {
        console.error(error);
      });

    handleCalendarPopup();
  };

  return (
    <div className="calendar-container">
      <div
        className="calendar-container__close-btn"
        onClick={handleCalendarPopup}
      >
        X
      </div>
      <div className="calendar-container__header">
        <h2>Renew a certificate</h2>
      </div>
      <div className="calendar-container__date-info">
        <p>
          Expiry date<span>{setDateTime(expiryDate)}</span>
        </p>
      </div>
      <div className="calendar-container__calendar">
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="dd/MM/yyyy HH:mm"
          timeFormat="HH:mm"
          minDate={new Date(expiryDate)}
          inline
        />
      </div>
      <div className="calendar-container__confirm-btn">
        <ButtonOne text="Confirm" color={true} onClick={handleConfirm} />
      </div>
    </div>
  );
}

export default CalendarPopup;
