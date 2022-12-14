import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/controlpanelaccordion.scss";
import ButtonThree from "../Button/ButtonThree";
import fileDownload from "js-file-download";
import { useLocalState } from "../../util/useLocalState";
import createReminders from "../../util/createReminders";

function ControlPanelInvoiceAccordion({ invoiceData, index, customerName }) {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  const changeDateFormat = (date) => {
    const oldDate = new Date(date);
    const newDate = oldDate.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return newDate;
  };

  const exportReminders = async () => {
    await axios
      .get(
        `api/certificate/find/all/serial/and/valid/invoice/id/${invoiceData.id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        fileDownload(createReminders(response.data), "reminders.ics");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <div
      className="control-panel-accordion-container__collapse-menu__item"
      key={index}
    >
      <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box">
        <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box__info">
          <p>Invoice number</p>
          <p>{invoiceData.invoiceNumber}</p>
        </div>
        <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box__info">
          <p>Date of agreement</p>
          <p>{changeDateFormat(invoiceData.dateOfAgreement)}</p>
        </div>
        <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box__info">
          <ButtonThree
            text="Certificates"
            onClick={() =>
              navigate("/certificates", {
                state: {
                  invoiceData: invoiceData,
                  customerName: customerName,
                },
              })
            }
          />
        </div>
        <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box__info">
          <ButtonThree text="Export reminders" onClick={exportReminders} />
        </div>
      </div>
      <div className="control-panel-accordion-container__collapse-menu__item__button-box"></div>
    </div>
  );
}

export default ControlPanelInvoiceAccordion;
