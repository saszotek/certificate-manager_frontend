import React from "react";
import "../../styles/personaldatails.scss";
import ButtonThree from "../Button/ButtonThree";

function PersonalDatails() {
  return (
    <div className="personal-datails-container">
      <div className="personal-datails-container__wrapper">
        <div className="personal-datails-container__wrapper__box">
          <div>
            <p>First name</p>
            <p>Maciej</p>
          </div>
          <div>
            <p>Pesel</p>
            <p>123123123123</p>
          </div>
          <div>
            <p>E-mail</p>
            <p>email@gmail.com</p>
          </div>
          <div>
            <p>City</p>
            <p>Katowice</p>
          </div>
        </div>
        <div className="personal-datails-container__wrapper__box">
          <div>
            <p>Last name</p>
            <p>Kowalski</p>
          </div>
          <div>
            <p>Phone number</p>
            <p>321321321</p>
          </div>
          <div>
            <p>Residential Address</p>
            <p>Słoneczna 2</p>
          </div>
          <div>
            <p>Postal code</p>
            <p>43-100</p>
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
