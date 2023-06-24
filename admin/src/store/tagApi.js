import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'tagApi',
	tagTypes: ['Tags'],
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_PROT}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`,
	}),
	endpoints: (build) => ({
		allTag: build.query({
			query: () => '/tag/all',
			providesTags: ['Tags'],
		}),
		createTag: build.mutation({
			query: (body) => ({
				url: '/tag/create',
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['Tags'],
		}),
		deleteTag: build.mutation({
			query: (id) => ({
				url: `/tag/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Tags'],
		}),
		addTagToArticle: build.mutation({
			query: ({ articleId, tagId }) => ({
				url: `/article/tags/add/${articleId}/${tagId}`,
				method: 'POST',
			}),
		}),
		delTagInArticle: build.mutation({
			query: ({ articleId, tagId }) => ({
				url: `/article/tags/del/${articleId}/${tagId}`,
				method: 'POST',
			}),
		}),
	})
});