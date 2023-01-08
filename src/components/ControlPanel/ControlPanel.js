import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../assets/icons/icons";
import "../../styles/controlpanel.scss";
import { useLocalState } from "../../util/useLocalState";
import ButtonFour from "../Button/ButtonFour";
import Loader from "../Loader/Loader";
import ControlPanelAccordion from "./ControlPanelAccordion";

function ControlPanel() {
  // eslint-disable-next-line
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  // eslint-disable-next-line
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/customer/find/all?page=${currentPage}&lastName=${lastName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTotalPages(response.data.totalPages);
        setCustomerData(response.data.customers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, lastName, jwt]);

  const previousPage = () => {
    if (!(currentPage === 0)) {
      setCurrentPage((prev) => prev - 1);
      setSelected(null);
    }
  };

  const nextPage = () => {
    if (!(currentPage === totalPages - 1)) {
      setCurrentPage((prev) => prev + 1);
      setSelected(null);
    }
  };

  const firstPage = () => {
    setCurrentPage(0);
    setSelected(null);
  };

  const lastPage = () => {
    setCurrentPage(totalPages - 1);
    setSelected(null);
  };

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
          <h1>Control Panel</h1>
          <div className="control-panel-container__filtr-box">
            <div>
              <input
                type="text"
                placeholder="search by last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
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
          <div className="control-panel-container__pagination-box">
            <ButtonFour
              text={
                <FontAwesomeIcon
                  icon={icons.faAnglesLeft}
                  onClick={firstPage}
                />
              }
            />
            <ButtonFour
              text={
                <FontAwesomeIcon
                  icon={icons.faAngleLeft}
                  onClick={previousPage}
                />
              }
            />
            <ButtonFour
              text={
                <FontAwesomeIcon icon={icons.faAngleRight} onClick={nextPage} />
              }
            />
            <ButtonFour
              text={
                <FontAwesomeIcon
                  icon={icons.faAnglesRight}
                  onClick={lastPage}
                />
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ControlPanel;
