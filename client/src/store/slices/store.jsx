import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducers,
  },
});

export default store;
