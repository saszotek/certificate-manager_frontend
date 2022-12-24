import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/controlpanelaccordion.scss";
import ButtonThree from "../Button/ButtonThree";

function ControlPanelAccordion({
  customerData,
  index,
  selected,
  toggleAccordion,
}) {
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
      className={
        index === 0
          ? "control-panel-accordion-container no-border"
          : "control-panel-accordion-container"
      }
      key={index}
    >
      <div
        className="control-panel-accordion-container__header"
        onClick={() => toggleAccordion(index)}
      >
        <div className="control-panel-accordion-container__header__info">
          <p>First name</p>
          <p>{customerData.firstName}</p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>Last name</p>
          <p>{customerData.lastName}</p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>Phone number</p>
          <p>{customerData.phoneNumber}</p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>E-mail</p>
          <p>{customerData.email}</p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>City</p>
          <p>{customerData.city}</p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <span>{selected === index ? "-" : "+"}</span>
        </div>
      </div>
      <div
        className={
          selected === index
            ? "control-panel-accordion-container__collapse-menu show"
            : "control-panel-accordion-container__collapse-menu"
        }
      >
        {customerData.invoices.map((item, index) => (
          <div
            className="control-panel-accordion-container__collapse-menu__item"
            key={index}
          >
            <div className="control-panel-accordion-container__collapse-menu__item__info">
              <p>Invoice number</p>
              <p>{item.invoiceNumber}</p>
            </div>
            <div className="control-panel-accordion-container__collapse-menu__item__info">
              <p>Date of agreement</p>
              <p>{changeDateFormat(item.dateOfAgreement)}</p>
            </div>
            <div className="control-panel-accordion-container__collapse-menu__item__info">
              <p>Status</p>
              <p>{item.status}</p>
            </div>
            <div className="control-panel-accordion-container__collapse-menu__item__info">
              <ButtonThree
                text="Certificates"
                onClick={() => navigate("/home")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControlPanelAccordion;
