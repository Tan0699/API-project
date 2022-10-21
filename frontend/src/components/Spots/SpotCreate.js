import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { createSpotImage, getAllSpots, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

const SpotCreateForm = ()=> {
const [address,setAddress] = useState("")
const [city,setCity] = useState("")
const [state,setState] = useState("")
const [country,setCountry] = useState("")
const [lat,setLat] = useState()
const [lng,setLng] = useState()
const [name,setName] = useState("")
const [description,setDescription] = useState("")
const [price,setPrice] = useState()
const [url,setUrl] = useState("")
const [preview,setPreview] = useState(true)
const [errorMessages, setErrorMessages] = useState([]);
const history = useHistory();
const dispatch= useDispatch();
const thisSpot = useSelector(state => state.spots)
const sessionUser = useSelector(state => state.session.user)


useEffect(()=>{
  const errors = []
  // if(!address)errors.push("Street address is required")
  // if(!state)errors.push("State is required")
  // if(!country)errors.push("Country is required")
  // if(!city)errors.push("City is required")
  // if(!description)errors.push("Description is required")
  // const number = ("1","2","3","4","5","6","7","8","9","0")
  const num1= ("1")
  const num2 = ("2")
  const num3 = ("3")
  const num4 = ("4")
  const num5 = ("5")
  const num6 = ("6")
  const num7 = ("7")
  const num8 = ("8")
  const num9 = ("9")
  const num0= ("0")
  if(!sessionUser)errors.push("Must be logged in to Host a spot")
  if(!(price>=0))errors.push("Price per day is invalid")
  if(!((lat>=0)||(lat<0)))errors.push("Latitude is not valid")
  if(!((lng>=0)||(lng<0)))errors.push("Longitude is not valid")
  if(!!((country.includes(num1))||(country.includes(num2))||
  (country.includes(num3))||(country.includes(num4))||(country.includes(num5))||
  (country.includes(num6))||(country.includes(num7))||(country.includes(num8))||
  (country.includes(num9))||(country.includes(num0))))errors.push("country is not valid")
  // if(!(lng>=0))errors.push("Longitude is not valid")
  // if(!(lat>=0||lat<0))errors.push("Latitude is not valid")
  // if(isNaNlng)errors.push("Longitude is not valid")
  // if(!name)errors.push("Name is required")
  if(!(url.endsWith(".jpg")))errors.push("Url needs to end with .jpg")
  // if(name.length>50)errors.push("Name must be less than 50 characters")
  setErrorMessages(errors)
},[price,lat,lng,url,country])
console.log("juan", typeof ("1"))
console.log("country", typeof country)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([])
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
    const payloadImage = {
      url,
      preview:true
    }
    
  
    //!!START SILENT
    let spotcreated =await dispatch(newSpotCreate(payload));
    if (spotcreated) {
  console.log("kekw",spotcreated)
      let imagecreated = await dispatch(createSpotImage(payloadImage,spotcreated.id))
      console.log("kekweee",imagecreated)
      // if(imagecreated){
        history.push('/')
      // }
    }
    console.log("errormshshhs",setErrorMessages)
  }
  return (
    
      <>
    <form className="spotC" onSubmit={handleSubmit}>
    {!!sessionUser?
    <div>
      
      {errorMessages.map((error,idx) => (
        <div key={idx}>{error}</div>))}
   
        </div>   :<div>Please Login to host a Spot</div>}
      <div className="welcome">     f    </div>
      <label>
        <input
        placeholder="Name"
          maxLength={50}
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
          maxLength={255}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Description"
          maxLength={255}
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
      <label>
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
      </label>
      <label>
        <input
        placeholder="State"
          type="text"
          maxLength={255}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        <input
        placeholder="Country"
          type="text"
          maxLength={255}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
        placeholder="Spot Image"
          type="text"
          maxLength={255}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <button disabled={!!errorMessages.length} className="createspot" type="submit">Host dis</button>
    </form>
    </>
  );
}

export default SpotCreateForm;