import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
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
const [errorMessages, setErrorMessages] = useState([]);
const history = useHistory();
const dispatch= useDispatch();

useEffect(()=>{
  const errors = []
  if(!address){errors.push("Street address is required")}
  if(!state){errors.push("State is required")}
  if(!country){errors.push("Country is required")}
  if(!city){errors.push("City is required")}
  if(!description){errors.push("Description is required")}
  if(!price){errors.push("Price per day is required")}
  if(!lat){errors.push("Latitude is not valid")}
  if(!lng){errors.push("Longitude is not valid")}
  if(!name){errors.push("Name is required")}
  if(name.length>50){errors.push("Name must be less than 50 characters")}
  setErrorMessages(errors)
},[address,state,city,country,name,price,lat,lng,description])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };
    
    let spotcreated;
    //!!START SILENT
      spotcreated = await dispatch(newSpotCreate(payload));
    //!!END
    if (spotcreated) {
      //!!START SILENT
      history.push('/');
     
    }


  }
  return (
    <div>pepe</div>
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
    
  );
}

export default SpotCreateForm;