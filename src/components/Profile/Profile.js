import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import "../../styles/profile.scss";
import ButtonTwo from "../Button/ButtonTwo";
import Certificate from "../Certificate/Certificate";
import Payment from "../Payment/Payment";
import PersonalData from "../PersonalDatails/PersonalDatails";
import {
  userDetails,
  statusLogged,
} from "../../redux/slices/validateTokenSlice";
import {
  fetchPersonDetails,
  personDetails,
} from "../../redux/slices/fetchPersonDetailsSlice";
import { useLocalState } from "../../util/useLocalState";
import Loader from "../Loader/Loader";
// import RedirectPage from "../RedirectPage/RedirectPage";

function Profile() {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isActiveCertificate, setIsActiveCertificate] = useState(false);
  const [isActivePersonalDatails, setIsActivePersonalDatails] = useState(true);
  const [isActivePayment, setIsActivePayment] = useState(false);
  const userDetailsLocal = useSelector(userDetails);
  const statusLoggedLocal = useSelector(statusLogged);
  const personDetailsLocal = useSelector(personDetails);
  const dispatch = useDispatch();
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

  useEffect(() => {
    if (personDetailsLocal === null) {
      if (statusLoggedLocal === "succeeded") {
        dispatch(fetchPersonDetails({ jwt: jwt, userId: userDetailsLocal.id }));
      }
    }
  }, [dispatch, jwt, statusLoggedLocal, userDetailsLocal, personDetailsLocal]);

  return (
    <>
      {personDetailsLocal ? (
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
              {isActiveCertificate && (
                <Certificate personDetailsLocal={personDetailsLocal} />
              )}
              {isActivePersonalDatails && (
                <PersonalData personDetailsLocal={personDetailsLocal} />
              )}
              {isActivePayment && (
                <Payment personDetailsLocal={personDetailsLocal} />
              )}
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
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Profile;
