import { useRef, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMeMutation } from "../../features/apis/Auth";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const [createMe, { isSuccess }] = useCreateMeMutation();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await createMe({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      setValues({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
      navigate("/welcome");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="Signin">
      <h1>Employee Signin</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="lastName">lastName:</label>
        <input
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <label htmlFor="firstName">firstName:</label>
        <input
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <label htmlFor="email">email:</label>
        <input
          type="text"
          name="email"
          ref={emailRef}
          value={values.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password}
          required
        />
        <button style={{ marginTop: "20px" }}>Sign In</button>
      </form>
    </section>
  );

  // return content;
};
export default SignIn;
