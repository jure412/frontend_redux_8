import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice, baseQueryWithReauth } from "../API";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

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

// Creates memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data // normalized state object with ids & entities
// );

//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the posts slice of state
// } = userAdapter.getSelectors(
//   (state: any) => selectUsersData(state) ?? initialState
// );
