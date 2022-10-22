// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
// frontend/src/components/SignupFormPage/index.js
// ...
import './SignupForm.css';
// ...

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setfirstName]=useState("")
  const [lastName,setlastName]=useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password,lastName,firstName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field'])
     ;
    
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="welcome">Welcome to FnF</div>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        <input
        placeholder="Email"
          type="text"
          maxLength={256}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Username"
          type="text"
          minLength={4}
          maxLength={30}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Password"
          type="password"
          value={password}
          maxLength={255}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Confirm Password"
          type="password"
          maxLength={255}
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Last Name"
          type="text"
          maxLength={30}
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="First Name"
          type="text"
          maxLength={30}
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          required
        />
      </label>
      <button className="signupButton" type="submit">Continue</button>
    </form>
    
  );
}

export default SignupFormPage;