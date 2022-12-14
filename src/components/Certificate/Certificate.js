import React from "react";
import "../../styles/certificate.scss";
import ButtonThree from "../Button/ButtonThree";

function Certificate({ personDetailsLocal }) {
  return (
    <div className="certificate-container">
      <div className="certificate-container__wrapper">
        <div className="certificate-container__wrapper__box">
          <div>
            <p>Issuer</p>
            <p>{personDetailsLocal.certificate.issuer}</p>
          </div>
          <div>
            <p>Public key</p>
            <p>{personDetailsLocal.certificate.publicKey}</p>
          </div>
          <div>
            <p>Valid from</p>
            <p>{personDetailsLocal.certificate.validFrom}</p>
          </div>
          <div>
            <p>Serial number</p>
            <p>{personDetailsLocal.certificate.serialNumber}</p>
          </div>
        </div>
        <div className="certificate-container__wrapper__box">
          <div>
            <p>Subject</p>
            <p>{personDetailsLocal.certificate.subject}</p>
          </div>
          <div>
            <p>Signature algorithm</p>
            <p>{personDetailsLocal.certificate.signatureAlgorithm}</p>
          </div>
          <div>
            <p>Valid to</p>
            <p>{personDetailsLocal.certificate.validTo}</p>
          </div>
          <div>
            <p>Certificate status</p>
            <p>{personDetailsLocal.certificate.certificateStatus}</p>
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
