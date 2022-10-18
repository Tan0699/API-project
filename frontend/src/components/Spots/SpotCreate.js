import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';

const SpotCreateForm = ()=> {
const [address,setAddress] = useState("")
const [city,setCity] = useState("")
const [state,setState] = useState("")
const [country,setCountry] = useState("")
const [lat,setLat] = useState("")
const [lng,setLng] = useState("")
const [name,SetName] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState("")


const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName,setfirstName]=useState("")
  const [lastName,setlastName]=useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors([]);
//       return dispatch(sessionActions.signup({ email, username, password,lastName,firstName }))
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) setErrors(data.errors);
//         });
//     }
//     return setErrors(['Confirm Password field must be the same as the Password field']);
//   };

//   return (
//     <form className="signup" onSubmit={handleSubmit}>
//       <div className="welcome">Welcome to FnF</div>
//       <ul>
//         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//       </ul>
//       <label>
//         <input
//         placeholder="Email"
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         <input
//         placeholder="Username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         <input
//         placeholder="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         <input
//         placeholder="Confirm Password"
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         <input
//         placeholder="Last Name"
//           type="text"
//           value={lastName}
//           onChange={(e) => setlastName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         <input
//         placeholder="First Name"
//           type="text"
//           value={firstName}
//           onChange={(e) => setfirstName(e.target.value)}
//           required
//         />
//       </label>
//       <button className="signupButton" type="submit">Continue</button>
//     </form>
    
//   );
// }

export default SpotCreateForm;