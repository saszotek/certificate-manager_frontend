import React, { useEffect, useState } from "react";
import "../../styles/controlpanelaccordion.scss";
import ControlPanelInvoiceAccordion from "./ControlPanelInvoiceAccordion";

function ControlPanelAccordion({
  customerData,
  index,
  selected,
  toggleAccordion,
}) {
  const [untilExpiration, setUntilExpiration] = useState(null);

  useEffect(() => {
    const currentDate = new Date().getTime();
    let expirationDate;
    let differenceInDays;
    let diff = 99999;

    customerData.invoices.forEach((invoice) => {
      invoice.certificates.forEach((certificate) => {
        expirationDate = new Date(certificate.validTo).getTime();

        if (expirationDate > currentDate) {
          differenceInDays = Math.ceil(
            (expirationDate - currentDate) / (1000 * 3600 * 24)
          );

          if (differenceInDays < diff) {
            diff = differenceInDays;
          }
        }
      });
    });
    setUntilExpiration(diff);

    // eslint-disable-next-line
  }, [customerData.invoices]);

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
        className={
          untilExpiration < 8
            ? `control-panel-accordion-container__header less-than-7`
            : untilExpiration < 15
            ? `control-panel-accordion-container__header less-than-14`
            : untilExpiration < 31
            ? `control-panel-accordion-container__header less-than-30`
            : untilExpiration < 61
            ? `control-panel-accordion-container__header less-than-60`
            : `control-panel-accordion-container__header`
        }
        onClick={() => toggleAccordion(index)}
      >
        <div className="control-panel-accordion-container__header__info">
          <p>First name</p>
          <p>
            <span>{customerData.firstName}</span>
          </p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>Last name</p>
          <p>
            <span>{customerData.lastName}</span>
          </p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>Phone number</p>
          <p>
            <span>{customerData.phoneNumber}</span>
          </p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>E-mail</p>
          <p>
            <span>{customerData.email}</span>
          </p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <p>City</p>
          <p>
            <span>{customerData.city}</span>
          </p>
        </div>
        <div className="control-panel-accordion-container__header__info">
          <span className="span-plus-minus">
            {selected === index ? "-" : "+"}
          </span>
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
