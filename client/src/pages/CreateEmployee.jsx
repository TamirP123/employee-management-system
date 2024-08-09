import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import ClockNotification from '../components/ClockNotification'; // Ensure this path is correct

const CreateEmployee = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: {
                    username: formState.username,
                    email: formState.email,
                    password: formState.password,
                },
            });

            const token = data.addUser.token;
            Auth.login(token);

            setNotification({
                message: 'User created successfully!',
                type: 'success',
            });
        } catch (err) {
            console.error(err);
            setNotification({
                message: 'Failed to create user.',
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
        <div className="create-background">
            <div className="signup-form">
                <form onSubmit={handleFormSubmit}>
                    <h2>Register an Employee</h2>
                    <p className="hint-text">Input new employee information to create.</p>
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
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
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
                            Register Now
                        </button>
                    </div>
                    <Link to="/">
                        <p>↰ Back to Dashboard</p>
                    </Link>
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

export default CreateEmployee;
