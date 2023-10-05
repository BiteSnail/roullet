import { createSlice } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
    name: 'select',
    initialState: {
        value: []
    },
    reducers: {
        top: (state) => {
            return state.value[0]
        },
        push: (state, action) => {
            state.value = state.value.concat(action.payload);
        },
        pop: (state) => {
            state.value = state.value.splice(1);
        },
    }
})

export const { top, push, pop } = selectSlice.actions

export default selectSlice.reducer