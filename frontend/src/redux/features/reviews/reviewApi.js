import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';


export const reviewApi =  createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/reviews`, // ✅ No trailing slash
        credentials: 'include',  // ✅ Fix case sensitivity
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: (reviewData) => ({
                url: '/post-review',
                method: 'POST',
                body: reviewData,
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
