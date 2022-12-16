import React, { useEffect, useState } from "react";
import "../../styles/certificate.scss";
import ButtonThree from "../Button/ButtonThree";

function Certificate({ personDetailsLocal }) {
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");

  useEffect(() => {
    const dateFrom = new Date(personDetailsLocal.certificate.validFrom);
    const resultFrom = dateFrom.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setValidFrom(resultFrom);

    const dateTo = new Date(personDetailsLocal.certificate.validTo);
    const resultTo = dateTo.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setValidTo(resultTo);
  }, [
    personDetailsLocal.certificate.validFrom,
    personDetailsLocal.certificate.validTo,
  ]);

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
            <p>{validFrom}</p>
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
            <p>{validTo}</p>
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
