import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";
import { setMsg } from "./Slices/msgSlice";
// import { REHYDRATE } from 'redux-persist'

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

// eslint-disable-next-line react-hooks/rules-of-hooks

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQuery(args, api, extraOptions);

  // const dispatch = useAppDispatch();
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
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
  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },
  tagTypes: ["Auth", "User", "Post", "Comment"],
  endpoints: (builder) => ({}),
});
