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
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function getCustomers() {
      await axios
        .get(`/api/customer/find/all?page=${currentPage}&email=${email}`, {
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
    }

    getCustomers();
  }, [currentPage, email, jwt]);

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
                placeholder="search by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              onClick={firstPage}
              text={<FontAwesomeIcon icon={icons.faAnglesLeft} />}
            />
            <ButtonFour
              onClick={previousPage}
              text={<FontAwesomeIcon icon={icons.faAngleLeft} />}
            />
            <ButtonFour
              onClick={nextPage}
              text={<FontAwesomeIcon icon={icons.faAngleRight} />}
            />
            <ButtonFour
              onClick={lastPage}
              text={<FontAwesomeIcon icon={icons.faAnglesRight} />}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ControlPanel;
