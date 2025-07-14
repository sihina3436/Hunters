import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseURL()}/api/auth`, 
    credentials: 'include',  
  }),
  tagTypes: ['Users'], 
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/register', 
        method: 'POST',
        body: newUser,
        headers: { 'Content-Type': 'application/json' }, 
      }),
    }),
    loginUser: builder.mutation({
      query: (loginUser) => ({
        url: '/login', 
        method: 'POST',
        body: loginUser,
        headers: { 'Content-Type': 'application/json' }, 
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
        url: '/users', 
        method: 'GET',
      }),
      refetchOnMount: true, 
      invalidatesTags: ['Users'], 
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`, 
        method: 'DELETE',
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`, 
        method: 'PUT',
        body: { role },
      }),
      refetchOnMount: true, 
      invalidatesTags: ['Users'], 
    }),

    editProfile: builder.mutation({
      query: (data) => ({
    url: `/edit-profile`,
    method: 'PATCH',
    body: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }),
}),
  getUserByEmail: builder.query({
    query: (email) => ({
      url: `/user-by-email/${encodeURIComponent(email)}`, 
      method: 'GET',
    }),
    providesTags: ['Users'], 
  }),


  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserRoleMutation, useEditProfileMutation, useGetUserByEmailQuery } = authApi;
export default authApi;
