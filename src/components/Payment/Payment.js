import React, { useState } from "react";
import "../../styles/payment.scss";
import ButtonThree from "../Button/ButtonThree";
import PaymentAccordion from "./PaymentAccordion";

function Payment({ personDetailsLocal }) {
  const [selected, setSelected] = useState(null);

  const toggleAccordion = (index) => {
    if (selected === index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  return (
    <div className="payment-container">
      {personDetailsLocal.payments.map((item, index) => (
        <PaymentAccordion
          key={index}
          paymentDetails={item}
          index={index}
          selected={selected}
          toggleAccordion={toggleAccordion}
        />
      ))}
      <div className="payment-container__bottom-box">
        <ButtonThree text="Edit payment information" />
      </div>
    </div>
  );
}

export default Payment;
