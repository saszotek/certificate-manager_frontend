import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogged: false,
  userDetails: null,
  status: "idle",
};

export const validateJwt = createAsyncThunk(
  "token/validateStatus",
  async (jwt) => {
    const response = await axios.get(`api/auth/validate?token=${jwt}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const res = {
      status: response.status,
      data: response.data,
    };
    return res;
  }
);

export const validateTokenSlice = createSlice({
  name: "validateToken",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(validateJwt.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(validateJwt.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.status === 200) {
          state.isLogged = true;
          state.userDetails = action.payload.data;
        } else {
          state.isLogged = false;
          state.userDetails = null;
        }
      })
      .addCase(validateJwt.rejected, (state, action) => {
        state.status = "failed";
        state.isLogged = false;
        state.userDetails = null;
      });
  },
});

export const isLogged = (state) => state.validateToken.isLogged;
export const userDetails = (state) => state.validateToken.userDetails;
export const statusLogged = (state) => state.validateToken.status;

export const { validate } = validateTokenSlice.actions;

export default validateTokenSlice.reducer;
