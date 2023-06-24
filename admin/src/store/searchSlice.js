import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
	name: 'searchSlice',
	initialState: {
		text: '',
	},
	reducers: {
		setSearch(state, action) {
			state.text = action.payload;
		}
	}
})