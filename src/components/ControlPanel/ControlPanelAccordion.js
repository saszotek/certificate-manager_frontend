import React, { useEffect, useState } from "react";
import "../../styles/controlpanelaccordion.scss";
import Loader from "../Loader/Loader";
import ControlPanelInvoiceAccordion from "./ControlPanelInvoiceAccordion";

function ControlPanelAccordion({
  customerData,
  index,
  selected,
  toggleAccordion,
}) {
  const [untilExpiration, setUntilExpiration] = useState(99999);

  useEffect(() => {
    const currentDate = new Date();
    let currentEpoch = currentDate;
    let expirationDate;
    let expirationEpoch;
    let differenceInDays;

    customerData.invoices.forEach((invoice) => {
      invoice.certificates.forEach((certificate) => {
        expirationDate = new Date(certificate.validTo);
        expirationEpoch = expirationDate;

        if (expirationEpoch > currentEpoch) {
          differenceInDays = Math.ceil(
            (expirationEpoch - currentEpoch) / (1000 * 3600 * 24)
          );

          if (differenceInDays < untilExpiration) {
            setUntilExpiration(differenceInDays);
          }
        }
      });
    });
  }, [customerData.invoices, untilExpiration]);

  return (
    <>
      {untilExpiration ? (
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
              untilExpiration < 7
                ? `control-panel-accordion-container__header less-than-7`
                : untilExpiration < 14
                ? `control-panel-accordion-container__header less-than-14`
                : untilExpiration < 30
                ? `control-panel-accordion-container__header less-than-30`
                : untilExpiration < 60
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
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ControlPanelAccordion;
