import React, { useState } from "react";
import "../../styles/selectbox.scss";
// import icons from "../../assets/icons/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";

function SelectBox({ items, defaultOption, certificateId, disabled }) {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [selectedItem, setSelectedItem] = useState(defaultOption);
  const [showItems, setShowItems] = useState(false);

  const dropDown = () => {
    if (disabled) {
      return;
    }
    setShowItems((prevState) => !prevState);
  };

  const selectItem = (item) => {
    setSelectedItem(item.value);
    setShowItems(true);
    updateStatus(item.value);
  };

  const updateStatus = (item) => {
    let reqBody = {
      status: item,
    };

    axios
      .put(`api/certificate/update/${certificateId}/status`, reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="select-box">
      <div
        className={
          showItems
            ? "select-box__container show-items-container"
            : "select-box__container"
        }
        onClick={dropDown}
      >
        <div className="select-box__container__box">
          <div className="select-box__container__box__selected-item">
            {selectedItem}
          </div>
          {/* <div className="select-box__container__box__arrow">
            <span>
              {showItems ? (
                <FontAwesomeIcon icon={icons.faAngleUp} />
              ) : (
                <FontAwesomeIcon icon={icons.faAngleDown} />
              )}
            </span>
          </div> */}
        </div>
        <div
          className={
            showItems
              ? "select-box__container__items show-items-items"
              : "select-box__container__items"
          }
        >
          {items.map((item) =>
            !(item.value === selectedItem) ? (
              <div key={item.id} onClick={() => selectItem(item)}>
                {item.value}
                {disabled}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectBox;
