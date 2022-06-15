import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>HELLO</div>
      <div onClick={() => dispatch(logout())}>Logout</div>
    </div>
  );
};

export default Home;
