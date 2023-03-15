import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paymentMethods: [],
    selectedPm: {},
};

const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {
        setPaymentMethods: (state, { payload = [] }) => {
            state.paymentMethods = payload;
        },
        setSelectedPM: (state, { payload }) => {
            state.selectedPm = payload;
        },
    },
});

const { reducer, actions } = paymentMethodSlice;

export const { setPaymentMethods, setSelectedPM } = actions;

export default reducer;
