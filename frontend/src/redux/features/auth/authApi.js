import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseURL()}/api/auth`, // ✅ No trailing slash
    credentials: 'include',  // ✅ Fix case sensitivity
  }),
  tagTypes: ['Users'], // ✅ Define tag types
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register', // ✅ Prepend `/`
        method: 'POST',
        body: newUser,
        headers: { 'Content-Type': 'application/json' }, // ✅ Ensure JSON format
      }),
    }),
    loginUser: builder.mutation({
      query: (loginUser) => ({
        url: '/login', // ✅ Prepend `/`
        method: 'POST',
        body: loginUser,
        headers: { 'Content-Type': 'application/json' }, // ✅ Ensure JSON format
      }),
    }),
    logoutUser: builder.mutation({
      query: (loginUser) => ({
        url: '/logout', 
        method: 'POST'
      }),
    }),
    getUser: builder.query({
      query: (loginUser) => ({
        url: '/users', // ✅ Prepend `/`
        method: 'GET',
      }),
      refetchOnMount: true, // ✅ Refetch on mount
      invalidatesTags: ['Users'], // ✅ Invalidate tags
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`, // ✅ Prepend `/`
        method: 'DELETE',
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`, // ✅ Prepend `/`
        method: 'PUT',
        body: { role },
      }),
      refetchOnMount: true, // ✅ Refetch on mount
      invalidatesTags: ['Users'], // ✅ Invalidate tags
    }),
    editProfile: builder.mutation({
      query: ({ profileData }) => ({
        url: `/edit-profile/`, // ✅ Prepend `/`
        method: 'PATCH',
        body: profileData,
      }),
    })

  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditProfileMutation } = authApi;
export default authApi;
