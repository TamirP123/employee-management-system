import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import ClockNotification from '../components/ClockNotification'; // Ensure this path is correct
import '../styles/loginpage.css';
import logo from '../assets/logo.png';
import '../styles/hero.css';

const Hero = () => {
    const [formState, setFormState] = useState({ email: 'admin@gmail.com', password: 'password' });
    const [login, { error }] = useMutation(LOGIN);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        document.body.classList.add('signup');
        document.body.classList.remove('homepage');
    }, []);

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
                message: 'Incorrect email or password.',
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
                    <img src={logo} alt="Logo" className="navbar-logo" />
                    <h3 className="hint-text">Log in to Employee Portal</h3>
                    <hr />
                    <p className="hint-text">
                        You can use an admin email such as <span className='text-danger'>"admin@gmail.com"</span> 
                        or an employee email such as <span className='text-primary'>"johndoe@gmail.com"</span> to login.
                    </p>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            required="required"
                            onChange={handleChange}
                            value={formState.email}
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
                            value={formState.password}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-block login-btn">
                            Log in
                        </button>
                    </div>
                    <div className="text-center">
                        By using Employee Bubble you are agreeing to our License Agreement
                    </div>
                </form>
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
};

export default Hero;

