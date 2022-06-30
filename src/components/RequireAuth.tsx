import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetMeQuery } from "../features/apis/Auth";
import { useAppDispatch } from "../app/hooks";
import { apiSlice } from "../features/API";

const RequireAuth: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isToken: boolean = !!localStorage.getItem("token");
  const { isLoading, isError } = useGetMeQuery(
    {},
    {
      skip: !isToken,
    }
  );

  useEffect(() => {
    if (isError || !isToken) {
      dispatch(apiSlice.util.resetApiState());
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isToken]);

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "calc(100vh - 50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>Loading User</p>
        </div>
      )}
      <Outlet />
    </div>
  );
};
export default RequireAuth;
