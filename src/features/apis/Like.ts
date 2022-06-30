import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API";

const likeAdapter = createEntityAdapter();

// const initialState =
likeAdapter.getInitialState();

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likeToggle: builder.mutation({
      query: (credentials: any) => ({
        url: "/like",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useLikeToggleMutation } = likeApiSlice;

// returns the query result object

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
// } = likeAdapter.getSelectors(
//   (state: any) => selectUsersData(state) ?? initialState
// );
