import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginAsync } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAsync(inputs));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      style={{
        display: "flex",
        flex: "1",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        placeholder="E-mail"
      />
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="password"
      />
      <button>Submit</button>
    </form>
  );
};

export default Login;
