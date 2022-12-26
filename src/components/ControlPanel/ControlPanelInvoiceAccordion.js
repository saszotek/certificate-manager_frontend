import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/controlpanelaccordion.scss";
import ButtonThree from "../Button/ButtonThree";

function ControlPanelInvoiceAccordion({ invoiceData, index, customerName }) {
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
          <p>Status</p>
          <p>{invoiceData.status}</p>
        </div>
        <div className="control-panel-accordion-container__collapse-menu__item__wrapper-box__info">
          <ButtonThree
            text="Przypomnij za 3 dni"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>
      <div className="control-panel-accordion-container__collapse-menu__item__button-box">
        <div>
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
        <div>
          <ButtonThree
            text="Export to .icl"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}

export default ControlPanelInvoiceAccordion;
