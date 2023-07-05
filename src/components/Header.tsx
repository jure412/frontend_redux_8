import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { apiSlice } from "../features/API";
import { selectMeResult, useLogoutMutation } from "../features/apis/Auth";

const Header: React.FC = () => {
  const { isSuccess }: { isSuccess: boolean } = useSelector(selectMeResult);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <span>
        <Link style={{ margin: "0 1rem 0 0" }} to="/">
          public
        </Link>
        {isSuccess ? (
          <>
            <Link style={{ margin: "0 1rem 0 0" }} to="/welcome">
              Welcome
            </Link>
            <Link style={{ margin: "0 1rem 0 0" }} to="/users">
              Users
            </Link>
            <Link style={{ margin: "0 1rem 0 0" }} to="/posts">
              Posts
            </Link>
            <span
              onClick={async () => {
                await logout({}).unwrap();
                dispatch(apiSlice.util.resetApiState());
                navigate("/login");
              }}
            >
              Logout
            </span>
          </>
        ) : (
          <>
            <Link style={{ margin: "0 1rem 0 0" }} to="/login">
              Login
            </Link>
            <Link style={{ margin: "0 1rem 0 0" }} to="/signup">
              Signup
            </Link>
          </>
        )}
      </span>
    </div>
  );
};

export default Header;
