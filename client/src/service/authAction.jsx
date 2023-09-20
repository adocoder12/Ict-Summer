import { registerRoute, loginRoute } from "../apiRoutes/userRoutes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import base64 from "base-64";

import axios from "axios";

// export const host = "http://127.0.0.1:8080/api/users/login'";

/*----------REGISTER---------*/

const registerUSer = createAsyncThunk(
  "users/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        registerRoute,
        {
          username,
          email,
          password,
        },
        config
      );

      if (response) {
        return response.data.message;
      }
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.error) {
        console.log(
          `error.response.data.message) ${error.response.data.error}`
        );
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/*----------LOGIN---------*/

const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        loginRoute,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + base64.encode(username + ":" + password),
          },
        }
      );

      if (response) {
        // localStorage.setItem(" token ", response.data.token);
        console.log("response at loginUser" + response.data);
        const decoded = jwtDecode(response.data.token);
        const userInfo = {
          user: decoded,
          token: response.data.token,
          message: response.data.message,
        };

        return userInfo;
      }
      console.log("authact + local " + response.data.token);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export { registerUSer, loginUser }; //

// const response = await fetch(registerRoute, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username, email, password }),
// });

// const user = await response.json();
