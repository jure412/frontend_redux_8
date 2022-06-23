import { createSlice } from "@reduxjs/toolkit";

export interface MsgState {
  msg: string;
  status: "success" | "error" | "warning";
}

export type Msgs = MsgState[] | [];

const initialState: Msgs = [];

export const msgSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setMsg: (state = [], action) => (state = [...state, action.payload]),
    removeMsgs: (state = []) => (state = []),
  },
});

export const { setMsg, removeMsgs } = msgSlice.actions;

export const getMsgs = (state: any) => {
  return state.auth;
};

export default msgSlice.reducer;
