import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    isLoading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        requestPending: (state) => {
            state.isLoading = true;
        },
        requestSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
        },
    },
});

const { reducer, actions } = userSlice;

export const { requestPending, requestSuccess } = actions;

export default reducer;
