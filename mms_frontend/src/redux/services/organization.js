import { createApi } from "@reduxjs/toolkit/query/react";
import apiBaseQuery from "./axiosBaseQuery";
export const ORGANIZATION_API_REDUCER_KEY = "organizationApi";

export const organizationApi = createApi({
  reducerPath: ORGANIZATION_API_REDUCER_KEY,
  baseQuery: apiBaseQuery,
  tagTypes: ["organization"],
  endpoints: (builder) => ({
    getAllOrganizations: builder.query({
      query: ({ page, q, limit }) => ({
        url: `admin/organizations?page=${page || 1}&q=${q || ""}&limit=${limit || 10}`,
      }),
      providesTags: ["organization"],
    }),
    getOrganization: builder.query({
      query: (id) => ({
        url: `admin/organizations/${id}`,
      }),
      providesTags: ["organization"],
    }),
    createOrganization: builder.mutation({
      query: (body) => ({
        url: `admin/organizations/`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    updateOrganization: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `admin/organizations/${id}/`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["organization"],
    }),
    deleteOrganization: builder.mutation({
      query: (id) => ({
        url: `admin/organizations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const {
  useGetAllOrganizationsQuery,
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} = organizationApi;
