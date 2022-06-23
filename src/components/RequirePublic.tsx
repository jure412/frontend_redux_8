import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RequirePublic: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     navigate("/welcome");
  //   }
  // }, [navigate, token]);

  return <Outlet />;
};
export default RequirePublic;
