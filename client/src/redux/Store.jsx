import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";

//the store where we acces to the data
export const store = configureStore({
  reducer: { auth: AuthReducer },
});
