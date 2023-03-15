import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./pages/login/authSlice";
import catReducer from "./pages/category/categorySlice"
import systemReducer from "../src/system/systemSlice"
import paymentReducer from "./pages/payment/PaymentSlice"




const store = configureStore({
  reducer: {
    user: authReducer,
    cat: catReducer,
    system: systemReducer,
    payment: paymentReducer

  },
});

export default store;
