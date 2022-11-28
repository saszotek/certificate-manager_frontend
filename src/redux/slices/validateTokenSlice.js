import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogged: false,
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
    return response.data;
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
        state.isLogged = action.payload;
      })
      .addCase(validateJwt.rejected, (state, action) => {
        state.status = "failed";
        state.isLogged = false;
      });
  },
});

export const isLogged = (state) => state.validateToken.isLogged;
export const statusLogged = (state) => state.validateToken.status;

export const { validate } = validateTokenSlice.actions;

export default validateTokenSlice.reducer;
