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
// const [lat,setLat] = useState()
// const [lng,setLng] = useState()
const [name,setName] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState()
const [errorMessages, setErrorMessages] = useState([]);
const history = useHistory();
const dispatch= useDispatch();

useEffect(()=>{
  const errors = []
  // if(!address)errors.push("Street address is required")
  // if(!state)errors.push("State is required")
  // if(!country)errors.push("Country is required")
  // if(!city)errors.push("City is required")
  // if(!description)errors.push("Description is required")
  if(!(price>=0))errors.push("Price per day is invalid")
  // if(!(lat>=0||lat<0))errors.push("Latitude is not valid")
  // if(isNaNlng)errors.push("Longitude is not valid")
  // if(!name)errors.push("Name is required")
  if(name.length>50)errors.push("Name must be less than 50 characters")
  setErrorMessages(errors)
},[name,price])
  const handleSubmit =  (e) => {
    e.preventDefault();
    setErrorMessages([])
    const payload = {
      address,
      city,
      state,
      country,
      // lat,
      // lng,
      name,
      description,
      price
    };
    
    
    //!!START SILENT
     let spotcreated = dispatch(newSpotCreate(payload));
    //!!END
    if (spotcreated) {
      //!!START SILENT
      history.push('/');
     
    }

    console.log("errormshshhs",setErrorMessages)
  }
  return (
    
      <>
    <form className="spotC" onSubmit={handleSubmit}>
    <div>
      {errorMessages.map((error) => (
        <div>{error}</div>))}
        </div>
      <div className="welcome">plsworkpepe</div>
      <label>
        <input
        placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      {/* <label>
        <input
        placeholder="Latitutde"
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Longitude"
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label> */}
      <label>
        <input
        placeholder="State"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <button disabled={!!errorMessages.length} className="createspot" type="submit">Host dis</button>
    </form>
    </>
  );
}

export default SpotCreateForm;