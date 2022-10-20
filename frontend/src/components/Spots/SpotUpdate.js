
import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { editThisSpot, getAllSpots, getSelectedSpot, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { createSpotImage } from '../../store/SpotsReducer';
const EditMySpot = ()=> {
  const{spotId} =useParams()
const thisSpot = useSelector(state => state.spots.oneSpot)
const spotImage = useSelector(state => state.spots.oneSpot.spotImages)
// // console.log("thisspot",thisSpot)
const [address,setAddress] = useState(thisSpot.address)
const [city,setCity] = useState(thisSpot.city)
const [state,setState] = useState(thisSpot.state)
const [country,setCountry] = useState(thisSpot.country)
const [lat,setLat] = useState(thisSpot.lat)
const [lng,setLng] = useState(thisSpot.lng)
const [name,setName] = useState(thisSpot.name)
const [description,setDescription] = useState(thisSpot.description)
const [price,setPrice] = useState(thisSpot.price)
const [errorMessages, setErrorMessages] = useState([]);
// const firstImg = thisSpot.SpotImages[0]
const [url,setUrl] = useState(spotImage)
// const [url,setUrl] = useState()
const [preview,setPreview] = useState(true)
const history = useHistory();
const dispatch= useDispatch();
useEffect(()=>{
  dispatch(getSelectedSpot(spotId))
},[dispatch])
useEffect(()=>{
  setCity(thisSpot.city)
  setAddress(thisSpot.address)
  setState(thisSpot.state)
  setCountry(thisSpot.country)
  setLat(thisSpot.lat)
  setLng(thisSpot.lng)
  setName(thisSpot.name)
  setPrice(thisSpot.price)
  setDescription(thisSpot.description)
},[thisSpot])
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
  // if(name.length>50)errors.push("Name must be less than 50 characters")
  setErrorMessages(errors)
},[price])
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
    let spotupdated = await dispatch(editThisSpot(payload,thisSpot.id));
    //!!END
    if (spotupdated) {
      //!!START SILENT
      let imagecreated = await dispatch(createSpotImage(payloadImage,thisSpot.id))
      history.push('/');
    }
    console.log("errormshshhs",setErrorMessages)
  }

    return (
          
      
      <form className="spotC" onSubmit={handleSubmit}>
      <div>
        {errorMessages.map((error,idx) => (
          <div key={idx}>{error}</div>))}
          </div>
        <div className="welcome">plsworkpepeASDFFHDSAJFIADJSJIADSFJIAFDSJIAFDSJI</div>
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
        <input
        placeholder="Spot Image"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button disabled={!!errorMessages.length} className="createspot" type="submit">Host dis</button>
      </form>
      
        
    )
}
export default EditMySpot;