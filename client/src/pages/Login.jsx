import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import ClockNotification from '../components/ClockNotification'; // Ensure this path is correct
import '../styles/loginpage.css';

function Login(props) {
    useEffect(() => {
      document.body.classList.add('signup');
      document.body.classList.remove('homepage');
    }, []);

    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error }] = useMutation(LOGIN);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = data.login.token;
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setNotification({
              message: 'Failed to login.',
              type: 'error',
          });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div className="background">
            <div className="signup-form mt-5">
                <form onSubmit={handleFormSubmit}>
                    <h2>Welcome Back!</h2>
                    <p className="hint-text">Please enter your Employee information.</p>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            required="required"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required="required"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block login-btn">
                            Log in
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ textDecoration: "none" }}>
                        Sign up
                    </Link>
                </div>
            </div>
            {notification.message && (
                <ClockNotification
                    message={notification.message}
                    onClose={handleCloseNotification}
                    type={notification.type}
                />
            )}
        </div>
    );
}

export default Login;
