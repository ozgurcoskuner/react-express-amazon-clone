import React, {useState} from 'react'
import '../Style/signin.css'
import { useAuth } from './contexts/AuthContext';
import amazonlogo from '../Media/amazonlogo-black.png'
import {useHistory, Link} from 'react-router-dom'

function SignIn() {
    const [userInformation, setUserInformation] = useState({
        email: '',
        password: '',
      });
      const [errorMessage, setErrorMessage] = useState('')
      const [loading, setLoading] = useState(false)
      const {signin} = useAuth()
      const history = useHistory()

      
      
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
          
          setLoading(true)
          setErrorMessage('')
          await signin(userInformation.email, userInformation.password)
          history.push('/')
        }
        catch{
          setErrorMessage('Failed to sign in')
          setLoading(false)
        }
        
      }

      return (
          <div className='signin-container'>
          <img src={amazonlogo} alt='amazon-logo'/>
        <form onSubmit={handleSubmit}>
        <p>Sign in</p>
        {errorMessage && (
          <div className="error-container">
            {errorMessage}
          </div>
        )}
          <label>
          Email
          <br/>
          <input
            type="email"
            value={userInformation.email}
            onChange={(e) =>
              setUserInformation({ ...userInformation, email: e.target.value })
            }
          />
          </label>
          <br/>
          <label>
            Password
            <br/>
          <input
            type="password"
            value={userInformation.password}
            onChange={(e) =>
              setUserInformation({ ...userInformation, password: e.target.value })
            }
          />
          </label>
          
              
              <input type='submit' disabled={loading} value='Continue'/>
              

              

        </form>
       
        <p className='new-to-amazon'>New to Amazon</p>
        
        
        <Link to ='/signup'><button>Create your Amazon account</button></Link>
        
        </div>
      );
}

export default SignIn
