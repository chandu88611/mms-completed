import { createApi } from "@reduxjs/toolkit/query/react";

import apiBaseQuery from "./axiosBaseQuery";

export const USERS_API_REDUCER_KEY = "usersApi";

export const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "users/me/",
      }),
      providesTags: ["user"],
    }),
    getUsers: builder.query({
      query: ({ page }) => ({
        url: `users/?page=${page}&limit=100`,
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => {
        if (!id) {
          return;
        }
        return {
          url: `users/${id}`,
        };
      },
      providesTags: ["user"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "users/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `users/${id}/`,
          method: "PATCH",
          body: rest,
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `users/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["user"],
    }),
    getGroups: builder.query({
      query: () => {
        return {
          url: `users/groups/`,
        };
      },
    }),
    getProducts: builder.query({
      query: () => {
        return {
          url: `products/pharmacy_products`,
        };
      },
    }),
    getCategories: builder.query({
      query: () => {
        return {
          url: `products/categories`,
        };
      },
    }),
    getCustomers: builder.query({
      query: () => {
        return {
          url: `customers/`,
        };
      },
    }),
    deleteCustomers: builder.mutation({
      query: ({id}) => {
        return {
          url: `customers/delete/${id}`,
          method: 'DELETE'
        };
      },
    }),
    createProduct: builder.mutation({
      query: (body) => {
        return {
          url: `products/pharmacy_products`,
          method: "POST",
          body,
        };
      },
    }),
    deleteProduct: builder.mutation({
      query: ({id}) => {
        return {
          url: `products/pharmacy_products/${id}/`,
          method: "DELETE",
          
        };
      },
    }),
    updateProduct: builder.mutation({
      query: ({id,body}) => {
        return {
          url: `products/pharmacy_products/${id}/`,
          method: "put",
          body: body
        };
      },
    }),
    createCategory: builder.mutation({
      query: (body) => {
        return {
          url: `products/categories`,
          method: "POST",
          body,
        };
      },
    }),
    createCustomer: builder.mutation({
      query: (body) => {
        return {
          url: `customers/add/`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useDeleteCustomersMutation,
  useUpdateProductMutation,
  useCreateCategoryMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetMeQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useGetGroupsQuery,
  useDeleteUserMutation,
  useLazyGetMeQuery,
  useGetCategoriesQuery,
  useDeleteProductMutation
} = usersApi;
