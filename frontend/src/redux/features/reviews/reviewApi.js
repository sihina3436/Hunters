import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';


export const reviewApi =  createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/reviews`, 
        credentials: 'include', 
        prepareHeaders: (headers) => {
        return headers; 
        },
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (formData) => ({
                url: '/post-review',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: (result, error, {postId}) => [{ type: 'Reviews', id: postId }],
        }),
        getReviewsCount: builder.query({
            query: () => ({
                url: '/total-reviews',
                method: 'GET',
            }),
    
        }),
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: (result) => result ? [{ type: 'Reviews', id: result[0] ?.email }] : [],
        }),
    }),
});

export const {
    usePostReviewMutation,
    useGetReviewsCountQuery,
    useGetReviewsByUserIdQuery,
} = reviewApi;

export default reviewApi;
