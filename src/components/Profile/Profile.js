import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/profile.scss";
import ButtonTwo from "../Button/ButtonTwo";
import Certificate from "../Certificate/Certificate";
import Payment from "../Payment/Payment";
import PersonalData from "../PersonalDatails/PersonalDatails";
// import RedirectPage from "../RedirectPage/RedirectPage";

function Profile() {
  const [isActiveCertificate, setIsActiveCertificate] = useState(false);
  const [isActivePersonalDatails, setIsActivePersonalDatails] = useState(true);
  const [isActivePayment, setIsActivePayment] = useState(false);
  // const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (state !== null) {
      switch (state.subpage) {
        case "personal":
          setIsActivePersonalDatails(true);
          break;
        case "certificate":
          setIsActivePersonalDatails(false);
          setIsActiveCertificate(true);
          break;
        case "payment":
          setIsActivePersonalDatails(false);
          setIsActivePayment(true);
          break;
        default:
          console.log("dupa");
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-container__box-wrapper">
        <h1>Maciej Kowalski</h1>
        <div className="profile-container__box-wrapper__straight-line"></div>
        <div className="profile-container__box-wrapper__main-button-box">
          <ButtonTwo
            text="Certificate"
            onClick={() => {
              setIsActiveCertificate(true);
              setIsActivePersonalDatails(false);
              setIsActivePayment(false);
            }}
            state={isActiveCertificate}
          />
          <ButtonTwo
            text="Personal datails"
            onClick={() => {
              setIsActiveCertificate(false);
              setIsActivePersonalDatails(true);
              setIsActivePayment(false);
            }}
            state={isActivePersonalDatails}
          />
          <ButtonTwo
            text="Payment"
            onClick={() => {
              setIsActiveCertificate(false);
              setIsActivePersonalDatails(false);
              setIsActivePayment(true);
            }}
            state={isActivePayment}
          />
        </div>
        <div className="profile-container__box-wrapper__content">
          {isActiveCertificate && <Certificate />}
          {isActivePersonalDatails && <PersonalData />}
          {isActivePayment && <Payment />}
          {/* {true && (
            <RedirectPage
              textHeader="Firstly you need to fill up your personal details"
              textButton="Fill up details"
              action={() => navigate("/home")}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
