import { configureStore } from "@reduxjs/toolkit";
import validateTokenReducer from "./slices/validateTokenSlice";
import fetchPersonDetailsReducer from "./slices/fetchPersonDetailsSlice";

export const store = configureStore({
  reducer: {
    validateToken: validateTokenReducer,
    fetchPersonDetails: fetchPersonDetailsReducer,
  },
});
