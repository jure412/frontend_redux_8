import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";
import { setMsg } from "./Slices/msgSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: config.api,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult: any = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult.data) {
      localStorage.setItem("token", refreshResult.data.token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      localStorage.removeItem("token");
    }
  }
  if (result.error) {
    api.dispatch(setMsg({ status: "error", msg: result.error.data }));
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Post", "Comment"],
  endpoints: (builder) => ({}),
});
