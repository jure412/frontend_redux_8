import { useRef, useState, useEffect, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/apis/Auth";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [email, setEmail] = useState("jure@gmail.com");
  const [password, setPassword] = useState("12345678");

  const navigate = useNavigate();

  const [login, { isError, isSuccess }] = useLoginMutation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      navigate("/welcome");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      errRef.current?.focus();
    }
  }, [isError, navigate]);

  const handleEmailInput = (e: { target: { value: SetStateAction<string> } }) =>
    setEmail(e.target.value);

  const handlePasswordInput = (e: {
    target: { value: SetStateAction<string> };
  }) => setPassword(e.target.value);

  return (
    <section className="login">
      <h1>Employee Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          value={email}
          onChange={handleEmailInput}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordInput}
          value={password}
          required
        />
        <button style={{ marginTop: "20px" }}>Sign In</button>
      </form>
    </section>
  );
};
export default Login;
