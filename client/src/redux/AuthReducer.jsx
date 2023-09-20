import { createSlice } from "@reduxjs/toolkit";
import { registerUSer, loginUser } from "../service/authAction";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  token: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUSer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUSer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successfull
        state.message = payload; //
      })
      .addCase(registerUSer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      /* ------LOGIN------------*/
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.token = payload.token;
        state.message = payload.message;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
        state.userInfo = null;
        state.token = null;

        console.log(payload.token);
      });
    /* ------LOGOUT------------*/
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

/*
extraReducers: {
  // register user
  [registerUSer.pending]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [registerUSer.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.success = true; // registration successful
    state.message = payload; //
  },
  [registerUSer.rejected]: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
  },
  // login user
  [loginUser.pending]: (state) => {
    state.loading = true;
    state.error = null;
  },
  [loginUser.fulfilled]: (state, { payload }) => {
    state.loading = false;
    state.userInfo = payload;
    state.userToken = payload.token;
  },
  [loginUser.rejected]: (state, { payload }) => {
    state.loading = false;
    state.error = payload;
    console.log(payload.token);
  },
},
*/
