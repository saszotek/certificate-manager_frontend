import React, { useState } from "react";
import "../../styles/selectbox.scss";
import axios from "axios";
import { useLocalState } from "../../util/useLocalState";

function SelectBox(props) {
  const { items, defaultOption, certificateId, disabled, setIsExpired } = props;

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

  const updateStatus = async (item) => {
    let reqBody = {
      status: item,
    };

    await axios
      .put(`api/certificate/update/${certificateId}/status`, reqBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (reqBody.status === "Expired" || reqBody.status === "Resigned") {
          setIsExpired(true);
        }
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
