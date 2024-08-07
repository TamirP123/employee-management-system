import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const CreateEmployee = () => {
    
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);
    
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    };
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
    return (
        
          <div className="create-background">
    <div className="signup-form">
    <form onSubmit={handleFormSubmit}>
		<h2>Create Employee</h2>
		<p className="hint-text">It's FREE and takes a minute.</p>
        <div className="form-group">
        	<input type="email" className="form-control" name="email" placeholder="Email" required="required" onChange={handleChange}/>
        </div>
		<div className="form-group">
            <input type="text" className="form-control" name="username" placeholder="Username" required="required" onChange={handleChange}/>
        </div>        
		<div className="form-group">
            <input type="password" className="form-control" name="password" placeholder="Password" required="required" onChange={handleChange}/>
        </div>
		<div className="form-group">
            <button type="submit" className="btn btn-success btn-lg btn-block">Register Now</button>
        </div>
    </form>
</div>
          </div>
    );
};

export default CreateEmployee;