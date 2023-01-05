import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/certificate.scss";
import CertificateItem from "./CertificateItem";

function Certificate() {
  const location = useLocation();

  return (
    <div className="certificate-container">
      <h1>{`${location.state.customerName}'s certificates`}</h1>
      <div className="certificate-container__wrapper">
        {location.state.invoiceData.certificates.map((item, index) => (
          <CertificateItem key={index} certificateData={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Certificate;
