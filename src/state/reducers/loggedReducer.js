import verifyToken from "../../util/verifyToken";

const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "verifyToken":
      return verifyToken(action.payload);
    default:
      return false;
  }
};

export default loggedReducer;
