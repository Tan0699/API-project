// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './login.css';
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
        return setErrors(['invalid credentials'])
      }
    );
  };

  return (
    <form  className="container" onSubmit={handleSubmit}>
      <div className="formwrap">
      <div className="log">Log In</div>
      <div className="line"></div>
      <div className="welcome">Welcome to FnF</div>
      <div className="login">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label >
        <input className="user"
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label >
        <input className="pw"
        placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div className="logwrap">
      <button className="loginButton" type="submit">Continue</button>
      </div>
      <div className="demowrap">
      <button className="demoButton" type="submit"
      onClick={()=>{setCredential("Demo-lition");setPassword("password")}}>Demo Login</button>
      </div>
      </div>
      </div>
    </form>
  );
}

export default LoginForm;