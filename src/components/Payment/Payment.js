import React from "react";
import "../../styles/payment.scss";
import ButtonThree from "../Button/ButtonThree";

function Payment({ personDetailsLocal }) {
  return (
    <div className="payment-container">
      <div className="payment-container__wrapper">
        <div className="payment-container__wrapper__box">
          <div>
            <p>Account number</p>
            <p>58273 3123 13213 3123</p>
          </div>
          <div>
            <p>SWIFT</p>
            <p>INGBIC</p>
          </div>
        </div>
        <div className="payment-container__wrapper__box">
          <div>
            <p>NIP</p>
            <p>434234234434</p>
          </div>
        </div>
      </div>
      <div className="payment-container__bottom-box">
        <ButtonThree text="Edit payment information" />
      </div>
    </div>
  );
}

export default Payment;
