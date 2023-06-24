import { configureStore } from "@reduxjs/toolkit";
import articleApi from "./articleApi";
import tagApi from "./tagApi";
import searchSlice from "./searchSlice";

export default configureStore({
	reducer: {
		[searchSlice.name]: searchSlice.reducer,
		[articleApi.reducerPath]: articleApi.reducer,
		[tagApi.reducerPath]: tagApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(tagApi.middleware)
			.concat(articleApi.middleware)
});

export const {
	useFindLockedQuery,
	useFindArticleQuery,
	useSearchArticlesQuery,
} = articleApi;


export const {
	usePopularTagQuery,
} = tagApi;

export const {
	setContent,
	setTag,
} = searchSlice.actions;