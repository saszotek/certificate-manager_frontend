import React from "react";
import "../../styles/controlpanelaccordion.scss";
import ControlPanelInvoiceAccordion from "./ControlPanelInvoiceAccordion";

function ControlPanelAccordion({
  customerData,
  index,
  selected,
  toggleAccordion,
}) {
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
          <ControlPanelInvoiceAccordion
            key={index}
            invoiceData={item}
            index={index}
            customerName={`${customerData.firstName} ${customerData.lastName}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ControlPanelAccordion;
