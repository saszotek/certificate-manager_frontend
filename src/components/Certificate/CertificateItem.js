import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/certificateitem.scss";
import ButtonThree from "../Button/ButtonThree";

function CertificateItem({ certificateData, index }) {
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
          ? "certificate-item-container no-border"
          : "certificate-item-container"
      }
      key={index}
    >
      <div className="certificate-item-container__header">
        <div className="certificate-item-container__header__info">
          <p>Serial number</p>
          <p>{certificateData.serialNumber}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Valid from</p>
          <p>{changeDateFormat(certificateData.validFrom)}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Valid to</p>
          <p>{changeDateFormat(certificateData.validTo)}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Card number</p>
          <p>{certificateData.cardNumber}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Card type</p>
          <p>{certificateData.cardType}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Status</p>
          <p>{certificateData.status}</p>
        </div>
        <div className="certificate-item-container__header__info">
          <ButtonThree
            text="Przypomnij za 3 dni"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}

export default CertificateItem;
