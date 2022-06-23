import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API";

const postAdapter = createEntityAdapter();

// const initialState =
postAdapter.getInitialState();

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (credentials: any) => ({
        url: `/posts?skip=${credentials?.skip}&take=${credentials?.take}`,
        method: "GET",
      }),
      transformResponse: (responseData: any[] = [], args, meta) => {
        return responseData;
      },
      providesTags: (result, error, page) => {
        return result
          ? [
              ...result[0].map(({ id }: any) => ({
                type: "Post" as const,
                id,
              })),
              { type: "Post", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Post", id: "PARTIAL-LIST" }];
      },
      // keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: (credentials: any) => ({
        url: "/post/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (credentials: any) => ({
        url: "/post/delete",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApiSlice;

// returns the query result object
export const selectPostsResult: any = postApiSlice.endpoints.getPosts.select(
  {}
);

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
// } = postAdapter.getSelectors(
//   (state: any) => selectUsersData(state) ?? initialState
// );
