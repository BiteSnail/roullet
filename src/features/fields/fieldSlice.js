import { createSlice } from "@reduxjs/toolkit";

export const fieldSlice = createSlice({
    name: 'field',
    initialState: {
        value: [{id: 0, name: "옵션 1", count: 0, size: 1}, {id: 1, name: "옵션 2", count: 0, size: 2}]
    },
    reducers: {
        insert: (state, action) => {
            state.value = state.value.concat({id: state.value[state.value.length - 1].id+1,name: action.payload, count: 0, size: 1});
        },
        remove: (state, action) => {
            const index = state.value.findIndex(f => f.id == action.payload);
            state.value.splice(index, 1);
        },
        select: (state, action) => {
            // const prev = state.value[action.payload];
            // state.value[action.payload] = {id: prev.id, name: prev.name, count: prev.count + 1};
            state.value[action.payload].count++;
        },
        load: (state, action) => {
            state.value = action.payload
        }, 
        sizeUp: (state, action) => {
            const index = state.value.findIndex(f => f.id == action.payload.id);
            state.value[index].size = action.payload.size;
        }
    }
})

export const { insert, remove, select, sizeUp, load } = fieldSlice.actions

export default fieldSlice.reducer