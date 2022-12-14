import React from "react";
import "../../styles/personaldatails.scss";
import ButtonThree from "../Button/ButtonThree";

function PersonalDatails({ personDetailsLocal }) {
  return (
    <div className="personal-datails-container">
      <div className="personal-datails-container__wrapper">
        <div className="personal-datails-container__wrapper__box">
          <div>
            <p>First name</p>
            <p>{personDetailsLocal.firstName}</p>
          </div>
          <div>
            <p>Pesel</p>
            <p>{personDetailsLocal.pesel}</p>
          </div>
          <div>
            <p>E-mail</p>
            <p>{personDetailsLocal.email}</p>
          </div>
          <div>
            <p>City</p>
            <p>{personDetailsLocal.city}</p>
          </div>
        </div>
        <div className="personal-datails-container__wrapper__box">
          <div>
            <p>Last name</p>
            <p>{personDetailsLocal.lastName}</p>
          </div>
          <div>
            <p>Phone number</p>
            <p>{personDetailsLocal.phoneNumber}</p>
          </div>
          <div>
            <p>Residential Address</p>
            <p>{personDetailsLocal.residentialAddress}</p>
          </div>
          <div>
            <p>Postal code</p>
            <p>{personDetailsLocal.postalCode}</p>
          </div>
        </div>
      </div>
      <div className="personal-datails-container__bottom-box">
        <ButtonThree text="Edit personal datails" />
      </div>
    </div>
  );
}

export default PersonalDatails;
