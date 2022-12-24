import { configureStore } from "@reduxjs/toolkit";
import validateTokenReducer from "./slices/validateTokenSlice";

export const store = configureStore({
  reducer: {
    validateToken: validateTokenReducer,
  },
});
