import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'tagApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_PROT}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`,
	}),
	endpoints: (build) => ({
		popularTag: build.query({ query: (count) => `/tag/popular/${count}` }),
		allTag: build.query({ query: () => '/tag/all' }),
	})
})