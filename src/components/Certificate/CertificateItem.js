import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/certificateitem.scss";
import { useLocalState } from "../../util/useLocalState";
import ButtonThree from "../Button/ButtonThree";
import SelectBox from "./SelectBox";
import setDateTime from "../../util/setDateTime";
import { useSelector } from "react-redux";
import { userDetails } from "../../redux/slices/validateTokenSlice";

function CertificateItem({ certificateData, index }) {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isExpired, setIsExpired] = useState(false);
  const userDetailsLocal = useSelector(userDetails);

  useEffect(() => {
    if (
      certificateData.status === "Expired" ||
      certificateData.status === "Resigned"
    ) {
      setIsExpired(true);
    }
  }, [isExpired, certificateData.status]);

  const statuses = [
    { value: "Invoice sent", id: 1 },
    { value: "Completed", id: 2 },
    { value: "Paid", id: 3 },
    { value: "Other company", id: 4 },
    { value: "Resigned", id: 5 },
    { value: "Expired", id: 6 },
  ];

  const scheduleEmail = () => {
    const reqBody = {
      email: userDetailsLocal.username,
    };

    axios
      .post(`/api/schedule/email/certificate/${certificateData.id}`, reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <div
        className={
          isExpired
            ? "certificate-item-container__header certificate-expired"
            : "certificate-item-container__header"
        }
      >
        <div className="certificate-item-container__header__info">
          <p>Serial number</p>
          <p className="ellipsis">
            <span>{certificateData.serialNumber}</span>
          </p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Valid from</p>
          <p>
            <span>{setDateTime(certificateData.validFrom)}</span>
          </p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Valid to</p>
          <p>
            <span>{setDateTime(certificateData.validTo)}</span>
          </p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Card number</p>
          <p className="ellipsis">
            <span>{certificateData.cardNumber}</span>
          </p>
        </div>
        <div className="certificate-item-container__header__info">
          <p>Card type</p>
          <p>
            <span>{certificateData.cardType}</span>
          </p>
        </div>
        <div className="certificate-item-container__header__info">
          {isExpired ? (
            <>
              <p>Status</p>
              <SelectBox
                items={statuses}
                defaultOption={certificateData.status}
                certificateId={certificateData.id}
                disabled={true}
              />
            </>
          ) : (
            <>
              <p>Change status</p>
              <SelectBox
                items={statuses}
                defaultOption={certificateData.status}
                certificateId={certificateData.id}
                disabled={false}
              />
            </>
          )}
        </div>
        <div className="certificate-item-container__header__info">
          {!isExpired && (
            <ButtonThree text="Remind in 3 days" onClick={scheduleEmail} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CertificateItem;
