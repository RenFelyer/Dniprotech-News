import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'articleApi',
	tagTypes: ['Article'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_PROT}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`,
	}),
	endpoints: (build) => ({
		allArticles: build.query({
			query: () => '/article/all',
			providesTags: ['Article'],
		}),

		findArticle: build.query({
			query: (id) => `/article/${id}`,
		}),

		updateArticles: build.mutation({
			query: ({ id, body }) => ({
				url: `/article/update/${id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Article'],
		}),

		createArticles: build.mutation({
			query: (body) => ({
				url: '/article/create',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Article'],
		}),

		lockedArticle: build.mutation({
			query: (id) => ({
				url: `/article/locked/${id}`,
				method: 'POST',
			}),
			invalidatesTags: ['Article'],
		}),
		deleteArticle: build.mutation({
			query: (id) => ({
				url: `/article/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Article'],
		}),
	})
});