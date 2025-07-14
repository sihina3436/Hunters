// src/redux/features/contact/contactApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/`, 
  }),
  endpoints: (builder) => ({
    // POST contact message
    postContact: builder.mutation({
      query: (contactData) => ({
        url: '/contact',
        method: 'POST',
        body: contactData,
      }),
    }),

    // GET all contact messages
    getContacts: builder.query({
      query: () => '/contact',
    }),
  }),
});

export const { usePostContactMutation, useGetContactsQuery } = contactApi;
