import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Msg } from "./Msg";

const Layout: React.FC = () => {
  return (
    <div className="container" style={{ padding: "10px" }}>
      <Header />
      <Outlet />
      <Msg />
    </div>
  );
};

export default Layout;
