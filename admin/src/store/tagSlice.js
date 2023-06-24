import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
	name: 'tag',
	initialState: {
		list: [],
	},
	reducers: {
		addTag(state, action) {
			if (state.list.filter((value) => value.id === action.payload.id).length === 0)
				state.list = [...state.list, action.payload];
		},
		removeTag(state, action) {
			state.list = state.list.filter((value) => value.id !== action.payload.id);
		},
		setTag(state, action) {
			state.list = action.payload;
		},
	}
});