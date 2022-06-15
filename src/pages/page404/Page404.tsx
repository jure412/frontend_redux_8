import React from "react";
import { useNavigate } from "react-router";

const Page404: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: `${200}px`,
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        flexDirection: "column",
      }}
    >
      <p>404 Page not found</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default Page404;
