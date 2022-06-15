import { FC, ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMeAsync, selectAuth } from "../features/auth/authSlice";

const RouteGuard: FC<{ page: ReactElement; auth: boolean }> = ({
  page,
  auth,
}) => {
  // const { data, loading, error } = useGetUserQuery({ skip: !localStorage.getItem("token"), errorPolicy: "all" })
  const location = useLocation();
  const navigate = useNavigate();

  const userAuth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userAuth.token && userAuth.isLoggedIn === false) {
      console.log("hey");
      dispatch(getMeAsync(userAuth.token));
    } else if (
      userAuth.token === "" &&
      userAuth.isLoggedIn === false &&
      location.pathname !== "/login"
    ) {
      console.log("redirect login");
      navigate("/login");
    }
    // console.log("here", userAuth, location);
  }, [userAuth.token]);

  useEffect(() => {
    if (userAuth.isLoggedIn) {
      navigate("/home");
    }
  }, [userAuth.isLoggedIn]);

  return <>{page}</>;
};

export default RouteGuard;
