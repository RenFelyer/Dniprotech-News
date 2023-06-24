import { configureStore } from "@reduxjs/toolkit";
import articleApi from "./articleApi";
import tagApi from "./tagApi";
import tagSlice from "./tagSlice";
import searchSlice from "./searchSlice";

export default configureStore({
	reducer: {
		[tagSlice.name]: tagSlice.reducer,
		[searchSlice.name]: searchSlice.reducer,
		[articleApi.reducerPath]: articleApi.reducer,
		[tagApi.reducerPath]: tagApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(articleApi.middleware)
			.concat(tagApi.middleware)
})

export const {
	useDeleteArticleMutation,
	useLockedArticleMutation,
	useFindArticleQuery,
	useAllArticlesQuery,

	useCreateArticlesMutation,
	useUpdateArticlesMutation,
} = articleApi;

export const {
	useAllTagQuery,
	useDeleteTagMutation,
	useCreateTagMutation,
	useAddTagToArticleMutation,
	useDelTagInArticleMutation,
} = tagApi

export const {
	setSearch,
} = searchSlice.actions;

export const {
	addTag,
	removeTag,
	setTag,
} = tagSlice.actions;