import axios from "axios";

const verifyToken = async (jwt) => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  await axios
    .get(`api/auth/validate?token=${jwt}`, headers)
    .then((isValid) => {
      return isValid.data;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

export default verifyToken;
