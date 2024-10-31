import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profilePic: null,
  },
  reducers: {
    setUserDetails: (stat, action) => {
      stat.email = action.payload.email;
      stat.profilePic = action.payload.profilePic;
    },
    clearUserDetails: (stat, action) => {
      stat.email = null;
      stat.profilePic = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
