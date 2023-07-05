import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API";

const userAdapter = createEntityAdapter();

// const initialState =
userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      transformResponse: (responseData: any[] = []) => {
        return responseData;
      },
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    getUser: builder.query({
      query: (credentials?: { id?: number }) => ({
        url: `/user/${credentials?.id}`,
        method: "GET",
      }),
      providesTags: (arg: any) => [{ type: "User", id: arg }],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery, useGetUserQuery } =
  userApiSlice;

// returns the query result object
export const selectUsersResult: any = userApiSlice.endpoints.getUsers.initiate;
