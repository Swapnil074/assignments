import {useNavigate} from 'react-router-dom'

function Signup() {
  const navigate=useNavigate()
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
        <input type="text" />
        <p>Last Name</p>
        <input type="text" />
        <p>Email</p>
        <input type="text" />
        <p>Password</p>
        <input type="text" />
        <button className="signup-button" onClick={()=>navigate('/dashboard')}>Signup</button>
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
