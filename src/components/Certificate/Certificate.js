import React from "react";
import "../../styles/certificate.scss";
import ButtonThree from "../Button/ButtonThree";

function Certificate() {
  return (
    <div className="certificate-container">
      <div className="certificate-container__wrapper">
        <div className="certificate-container__wrapper__box">
          <div>
            <p>Issuer</p>
            <p>CA</p>
          </div>
          <div>
            <p>Public key</p>
            <p>%#$343242asdadada</p>
          </div>
          <div>
            <p>Valid from</p>
            <p>2022-05-15</p>
          </div>
          <div>
            <p>Serial number</p>
            <p>123123123</p>
          </div>
        </div>
        <div className="certificate-container__wrapper__box">
          <div>
            <p>Subject</p>
            <p>Root</p>
          </div>
          <div>
            <p>Signature algorithm</p>
            <p>RSA256</p>
          </div>
          <div>
            <p>Valid to</p>
            <p>2023-02-21</p>
          </div>
          <div>
            <p>Certificate status</p>
            <p>Paid</p>
          </div>
        </div>
      </div>
      <div className="certificate-container__bottom-box">
        <ButtonThree text="Extend validity period" />
      </div>
    </div>
  );
}

export default Certificate;
