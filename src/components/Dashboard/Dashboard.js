// import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.scss";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
// import { useLocalState } from "../../util/useLocalState";

function Dashboard() {
  /* eslint-disable */
  // const [dataPersons, setDataPersons] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [jwt, setJwt] = useLocalState("", "jwt");

  // const headers = {
  //   headers: {
  //     Authorization: `Bearer ${jwt}`,
  //   },
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get("api/person/find/all", headers)
  //       .then((response) => {
  //         console.log(response);
  //         setDataPersons(response.data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };

  //   fetchData();
  // }, []);

  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* {loading && <div>Loading screen</div>}
        {!loading && (
          <div>
            {dataPersons.map((item) => (
              <div key={item.id}>{JSON.stringify(item)}</div>
            ))}
          </div>
        )} */}

        <div className="dashboard-container__wrapper">
          <div className="dashboard-container__wrapper__title-box">
            <h1>What would you like to do first?</h1>
          </div>
          <div className="dashboard-container__wrapper__button-box">
            <Button onClick={handleLogIn} text="Log in" color="true" />
          </div>
          <div className="dashboard-container__wrapper__button-box">
            <Button onClick={handleSignUp} text="Sign up" color="true" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
