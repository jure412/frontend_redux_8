import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMeAsync, selectAuth } from "../features/auth/authSlice";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  let location = useLocation();

  useEffect(() => {
    dispatch(getMeAsync(auth.token));
  }, [auth.token]);

  console.log({ auth, location });

  if (auth.isLoggedIn === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else if (location.pathname === "/") {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoute;
