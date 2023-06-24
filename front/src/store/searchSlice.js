import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
	name: 'search',
	initialState: {
		content: "",
		tag: "",
	},
	reducers: {
		setContent(state, action) {
			state.content = action.payload;
		},
		setTag(state, action) {
			state.tag = action.payload
		}
	}
})