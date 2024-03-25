import { createApi } from "@reduxjs/toolkit/query/react";

import apiBaseQuery from "./axiosBaseQuery";

export const AUTH_API_REDUCER_KEY = "authApi";
export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    getSession: builder.query({
      query: () => ({
        url: "auth/session",
      }),
      providesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (body) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      // invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetSessionQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
