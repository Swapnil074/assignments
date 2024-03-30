import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
function Signin() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) navigate("/dashboard");

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleSignin = async () => {
    const res = await axios.post("http://localhost:8000/api/v1/user/signin", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo))
    navigate("/dashboard");
  };

  return (
    <>
      <div className="login-container">
        <div className="heading-container">
          <p
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              marginBottom: "0.5rem",
            }}
          >
            Sign In
          </p>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "100",
              marginBottom: "1rem",
              color: "grey",
            }}
          >
            Enter your credentials to access your account
          </p>
        </div>
        <div className="input-container">
          <p>Email</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signup-button" onClick={() => handleSignin()}>
            Signin
          </button>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "lighter",
              marginBottom: "1rem",
              alignSelf: "center",
              marginLeft: 0,
            }}
          >
            Dont have an account?{" "}
            <a
              style={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              SignUp
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
export default Signin;
