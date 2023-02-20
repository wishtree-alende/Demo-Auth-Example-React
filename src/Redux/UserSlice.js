import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "User",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.userObj = action.payload;
    },
    resetUser: (state) => {
      return {};
    },
  },
});
// this is for dispatch action
export const { setUser, resetUser } = userSlice.actions;
// this for config store
export default userSlice.reducer;
