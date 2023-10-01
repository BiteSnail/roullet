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
        insert: (state, action) => {
            state.value = state.value.push(action.payload);
        },
        remove: (state) => {
            state.value.shift();
        }
    }
})

export const { top, insert, remove } = selectSlice.actions

export default selectSlice.reducer