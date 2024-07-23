import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";


function Login(props) {
    useEffect(() => {
      document.body.classList.add('signup');
      document.body.classList.remove('homepage');
    });

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(JSON.stringify(formState));
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="background">
    <div class="signup-form mt-5">
      <form onSubmit={handleFormSubmit}>
        <h2>Welcome Back!</h2>
        <p class="hint-text">Please enter your Employee information.</p>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            name="email"
            placeholder="Email"
            required="required"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required="required"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-lg btn-block login-btn">
            Log in
          </button>
        </div>
      </form>
      <div class="text-center">
        Don't have an account?{" "}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          Sign up
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Login;
