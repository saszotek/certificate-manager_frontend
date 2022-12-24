import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/controlpanel.scss";
import { useLocalState } from "../../util/useLocalState";
import Loader from "../Loader/Loader";
import ControlPanelAccordion from "./ControlPanelAccordion";

function ControlPanel() {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [customerData, setCustomerData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/customer/find/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setCustomerData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [jwt]);

  const toggleAccordion = (index) => {
    if (selected === index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="control-panel-container">
          <div className="control-panel-container__wrapper">
            {customerData.map((item, index) => (
              <ControlPanelAccordion
                key={index}
                customerData={item}
                index={index}
                selected={selected}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ControlPanel;
