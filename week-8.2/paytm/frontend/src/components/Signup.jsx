import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Signup() {
  const navigate=useNavigate()
  if (localStorage.getItem('token'))
  navigate('/dashboard')
  const [firstName, setFirstName]=useState()
  const [lastName, setLastName]=useState()
  const[username, setUsername]=useState()
  const [password, setPassword]=useState()
  const handleSignup=async()=>{
    const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
      username,
      firstName,
      lastName,
      password
    });
    localStorage.setItem('token', res.data.token)
    navigate('/dashboard')
  }
  return (
    <>
    <div className="login-container">
      <div className="heading-container">
        <p style={{
          fontWeight:"bold",
          fontSize:"2rem",
          marginBottom:"0.5rem"
        }}>Sign Up</p>
        <p style={{
          fontSize:"1rem",
          fontWeight:"100",
          marginBottom:"1rem",
          color:'grey'
          }}>Enter your information to create an account</p>
      </div>
      <div className="input-container">
        <p>First Name</p>
        <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
        <p>Last Name</p>
                <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)}/>

        <p>Email</p>
                <input type="text" value={username} onChange={e=>setUsername(e.target.value)}/>

        <p>Password</p>
                <input type="text" value={password} onChange={e=>setPassword(e.target.value)}/>

        <button className="signup-button" onClick={()=>handleSignup()}>Signup</button>
        <p style={{
          fontSize:"1rem",
          fontWeight:"lighter",
          marginBottom:"1rem",
          alignSelf:'center',
          marginLeft:0
          }}>Already have an account? <a style={{
            cursor:'pointer',
            textDecoration:'underline'
          }} onClick={()=>navigate('/signin')}>SignIn</a></p>
      </div>
    </div>
    </>
  );
}

export default Signup;
