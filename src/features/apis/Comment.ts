import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API";

const commentAdapter = createEntityAdapter();

commentAdapter.getInitialState();

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (credentials: any) => ({
        url: `/comments?skip=${credentials?.skip}&take=${credentials?.take}&postId=${credentials?.postId}`,
        method: "GET",
      }),
      providesTags: (result, error, page) => {
        return result
          ? [
              ...result[0].map(({ id }: any) => ({
                type: "Comment" as const,
                id,
              })),
              { type: "Comment", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Comment", id: "PARTIAL-LIST" }];
      },
    }),
    createComment: builder.mutation({
      query: (credentials: any) => ({
        url: "/comment/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Post", "Comment"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } =
  commentApiSlice;
