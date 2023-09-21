import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const apiUrl = config.apiUrl;
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle sign-in logic here (e.g., send a request to your backend).
      console.log(apiUrl)
      const response = await fetch(`${apiUrl}/api/sign-in/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": email,
        "password": password
    })
    })
    if (!response.ok) {
        if (response.status === 401) {
          // Handle 401 status (Unauthorized) - redirect to login page or display an error message
          console.log('Unauthorized: Please log in.');
          alert("Wrong Credentials")
        } else {
          // Handle other non-OK status codes as generic errors
          alert("Try Again")
        }
      }
      else{
        const data = await response.json();
        try{
            console.log(data)
            localStorage.setItem("token", data.access_token);
            navigate("/find");
        }
        catch{
            navigate("/");
        }
      }
    };
  
    return (
      <div className="sign-in">
        <h2>Sign In</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              placeholder="Enter your username"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <br></br>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br></br>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
}

export default SignIn
