import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import '../styles/loginpage.css';
import logo from "../assets/logo.png"
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/hero.css';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
          <div className="signup-form mt-5">
            <form onSubmit={handleFormSubmit}>
              <img src={logo} alt="Logo" className="navbar-logo" />
              <h3 className="hint-text">Log in to Employee Portal</h3>
              <hr />
              <p className="hint-text">You can use an admin email such as <span className='text-danger'>"admin@gmail.com"</span> 
              or an employee email such as <span className='text-primary'>"employee@gmail.com"</span> to login.</p>
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
                  placeholder="Password is `password`"
                  required="required"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-lg btn-block login-btn">
                  Log in
                </button>
              </div>
            <div className="text-center">
            By using Employee Bubble you are
            agreeing to our License Agreement
            </div>
            </form>
          </div>
        </div>
    );
};

export default Hero;
