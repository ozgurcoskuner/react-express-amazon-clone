import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import {Link, useHistory} from "react-router-dom"
import "../Style/signup.css";
import amazonlogo from "../Media/amazonlogo-black.png";

function SignUp() {
  const [userInformation, setUserInformation] = useState({
    firstname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup} = useAuth();


     


   const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInformation.password !== userInformation.passwordConfirm) {
      return setErrorMessage('Passwords do not match');
    } 
    else if(userInformation.password.length < 6){
      return setErrorMessage('Password is shorter than 6 characters');
    }
    try{
      
      setErrorMessage('')
      setLoading(true)
      const userCred = await signup(userInformation.email, userInformation.password)
      await userCred.user.updateProfile({displayName: userInformation.firstname})
      
      history.push('/signin')
    }
    catch{
      setErrorMessage('Failed to create an account')
      setLoading(false)
    }
    
  };
  return (
    
    <div className="signup-container">
      <img src={amazonlogo} alt="amazon-logo" />
      <form onSubmit={handleSubmit}>
        <p>Create account</p>
        {errorMessage && (
          <div className="error-container">
            {errorMessage}
          </div>
        )}
        <label>
          Your name
          <br />
          <input
            type="text"
            value={userInformation.firstname}
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                firstname: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
          Email
          <br />
          <input
            type="email"
            value={userInformation.email}
            onChange={(e) =>
              setUserInformation({ ...userInformation, email: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            type="password"
            value={userInformation.password}
            placeholder="At least 6 characters"
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                password: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
          Re-enter password
          <br />
          <input
            type="password"
            value={userInformation.passwordConfirm}
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                passwordConfirm: e.target.value,
              })
            }
          />
        </label>
        <input
          type="submit"
          value="Create your Amazon account"
          disabled={loading}
        />
        <Link to='/signin'><span>Already have an account? Sign in!</span></Link>
      </form>
    </div>
  );
}

export default SignUp;
