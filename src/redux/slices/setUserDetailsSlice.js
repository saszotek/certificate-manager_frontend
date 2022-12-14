import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

export const setUserDetailsSlice = createSlice({
  name: "setUserDetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const userDetails = (state) => state.setUserDetails.userData;

export const { setUser } = setUserDetailsSlice.actions;

export default setUserDetailsSlice.reducer;
