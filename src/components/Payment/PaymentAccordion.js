import React from "react";
import "../../styles/payment.scss";

function PaymentAccordion({
  paymentDetails,
  index,
  selected,
  toggleAccordion,
}) {
  return (
    <div className="payment-container__wrapper" key={index}>
      <div
        className="payment-container__wrapper__title"
        onClick={() => toggleAccordion(index)}
      >
        <div className="payment-container__wrapper__title__header-info">
          <p>Account number</p>
          <h2>{paymentDetails.accountNumber}</h2>
        </div>
        <div className="payment-container__wrapper__title_plus-minus">
          {selected === index ? "-" : "+"}
        </div>
      </div>
      <div
        className={
          selected === index
            ? "payment-container__wrapper__info-collapse show"
            : "payment-container__wrapper__info-collapse"
        }
      >
        <div>
          <p>NIP</p>
          <p>{paymentDetails.nip}</p>
        </div>
        <div>
          <p>SWIFT</p>
          <p>{paymentDetails.swift}</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentAccordion;
