export const verifyToken = (jwt) => {
  return (dispatch) => {
    dispatch({
      type: "verifyToken",
      payload: jwt,
    });
  };
};
