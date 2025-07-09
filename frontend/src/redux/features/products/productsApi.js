import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

<<<<<<< HEAD
// create API slice using Redux Toolkit 
const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/products`, 
        credentials: 'include',  
    }),
    tagTypes: ['Products'], 
=======
const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/products`, // ✅ No trailing slash
        credentials: 'include',  // ✅ Fix case sensitivity
    }),
    tagTypes: ['Products'], // ✅ Define tag types
>>>>>>> admin-dashboard-and-more
    endpoints:(builder) =>({
      fetchAllProducts: builder.query({
        query: ({ category, color, minPrice, maxPrice, page = 1, limit = 10 }) => {
          const queryParams = new URLSearchParams({
            category: category && category !== 'all' ? category : '',
            color: color && color !== 'all' ? color : '',
            minPrice: minPrice !== undefined && !isNaN(minPrice) ? minPrice.toString() : '0',
            maxPrice: maxPrice !== undefined && !isNaN(maxPrice) ? maxPrice.toString() : '',
            page: page.toString(),
            limit: limit.toString(),
          }).toString();
      
<<<<<<< HEAD
          console.log("Fetching products with query:", `/?${queryParams}`); 
=======
          console.log("Fetching products with query:", `/?${queryParams}`); // ✅ Debugging
>>>>>>> admin-dashboard-and-more
      
          return `/?${queryParams}`;
        },
        providesTags: ['Products'],
      }),
       

              fetchProductById: builder.query({
<<<<<<< HEAD
                query: (id) => `/${id}`, 
                providesTags:(result, error, id)  => [{type: "products" , id}], 
=======
                query: (id) => `/${id}`, // ✅ Use template literal for URL
                providesTags:(result, error, id)  => [{type: "products" , id}], // ✅ Use the defined tag type
>>>>>>> admin-dashboard-and-more
              }),

              AddProduct: builder.mutation({
                query: (newProduct) => ({
                  url: "/create-product",
                  method: "POST",
                  body: newProduct,
                  credentials: "include",
                }),
                invalidatesTags: ["Products"],
              }),
          
              fetchRelatedProducts: builder.query({
                query: (id) => `/related/${id}`,
              }),
              updateProduct: builder.mutation({
                query: ({ id, ...rest }) => ({
                  url: `update-product/${id}`,
                  method: "PATCH",
                  body: rest,
                  credentials: "include",
                }),
                invalidatesTags: ["Products"],
              }),
          
              deleteProduct: builder.mutation({
                query: (id) => ({
                  url: `/${id}`,
                  method: "DELETE",
                  credentials: "include",
                }),
                invalidatesTags: (result, error, id) => [{ type: "Products", id }],
              }),
    }),
    
});

<<<<<<< HEAD
// Export the automatically generated hooks for each endpoint
export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchRelatedProductsQuery} = productsApi;

// Export the productsApi slice for use in the store
=======
export const {useFetchAllProductsQuery, useFetchProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation, useFetchRelatedProductsQuery} = productsApi;

>>>>>>> admin-dashboard-and-more
export default productsApi;