import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../API";

const authAdapter = createEntityAdapter();

// const initialState =
authAdapter.getInitialState();

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: ["Auth"],
      keepUnusedDataFor: 5,
      extraOptions: {},
    }),
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: ({ token }, error) => {
        token
          ? localStorage.setItem("token", token)
          : localStorage.removeItem("token");
      },
      // extraOptions: (all: any) => {
      //   console.log({ all });
      // },
      invalidatesTags: () => ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
      }),
      transformResponse(baseQueryReturnValue) {
        localStorage.removeItem("token");
        return baseQueryReturnValue;
      },
      invalidatesTags: ["Auth", "User"],
    }),
    createMe: builder.mutation({
      query: (credentials: any) => ({
        url: "/user/create",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useCreateMeMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApiSlice;

// returns the query result object
export const selectMeResult: any = authApiSlice.endpoints.getMe.select({});
