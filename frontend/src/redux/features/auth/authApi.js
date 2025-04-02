import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

// create API slice using Redux Toolkit 
const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${getBaseURL()}/api/auth`, 
    credentials: 'include',  // Ensures cookies are sent with requests
  }),
  tagTypes: ['Users'], 
  // Define the endpoints for the API
  endpoints: (builder) => ({
    registerUser: builder.mutation({   // Register a new user
      query: (newUser) => ({
        url: '/register', // API route for user registration
        method: 'POST',   // HTTP method
        body: newUser,    // Request payload (user data)
        headers: { 'Content-Type': 'application/json' }, 
      }),
    }),
    loginUser: builder.mutation({  // Log in an existing user
      query: (loginUser) => ({
        url: '/login', 
        method: 'POST',
        body: loginUser,
        headers: { 'Content-Type': 'application/json' }, 
      }),
    }),
    logoutUser: builder.mutation({  // Log out the current user
      query: (loginUser) => ({
        url: '/logout', 
        method: 'POST'
      }),
    }),
    getUser: builder.query({
      query: (loginUser) => ({
        url: '/users', 
        method: 'POST',
      }),
      refetchOnMount: true, 
      invalidatesTags: ['Users'], 
    }),
    deleteUser: builder.mutation({ // Delete a  user by ID
      query: (userId) => ({
        url: `/users/${userId}`, 
        method: 'DELETE',
      }),
    }),
    updateUserRole: builder.mutation({ // Update a user's role (e.g., Admin, User)
      query: ({ userId, role }) => ({
        url: `/users/${userId}`, 
        method: 'PATCH',
        body: { role },
      }),
      refetchOnMount: true, 
      invalidatesTags: ['Users'],
    }),
    editProfile: builder.mutation({ // Edit user profile
      query: ({ profileData }) => ({
        url: `/edit-profile/`, 
        method: 'PATCH',
        body: profileData,
      }),
    })

  }),
});
// Exporting generated hooks for usage in components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation } = authApi;

// Exporting the API slice reducer for Redux store configuration
export default authApi;
