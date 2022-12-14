import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  personDetails: null,
  status: "idle",
};

export const fetchPersonDetails = createAsyncThunk(
  "api/person",
  async (params) => {
    const response = await axios.get(
      `/api/person/user/find/id/${params.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.jwt}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchPersonDetailsSlice = createSlice({
  name: "fetchPersonDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPersonDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPersonDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personDetails = action.payload;
      })
      .addCase(fetchPersonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.personDetails = null;
      });
  },
});

export const personDetails = (state) => state.fetchPersonDetails.personDetails;
export const statusPersonDetails = (state) => state.fetchPersonDetails.status;

export const { fetchPerson } = fetchPersonDetailsSlice.actions;

export default fetchPersonDetailsSlice.reducer;
