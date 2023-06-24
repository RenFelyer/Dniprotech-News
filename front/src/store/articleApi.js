import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'articleApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_PROT}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`,
	}),
	endpoints: (build) => ({
		findArticle: build.query({ query: (id) => `/article/${id}` }),
		findLocked: build.query({ query: () => '/articles/locked' }),
		searchArticles: build.query({
			query: ({ content, page, tag }) => ({
				url: '/articles/search',
				method: 'POST',
				body: JSON.stringify({ content, page, tag }),
			})
		})
	})
})