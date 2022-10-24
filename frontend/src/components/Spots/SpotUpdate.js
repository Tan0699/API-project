
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editThisSpot, getAllSpots, getSelectedSpot, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { createSpotImage } from '../../store/SpotsReducer';
import './SpotUpdate.css';
const EditMySpot = () => {
  const { spotId } = useParams()
  const thisSpot = useSelector(state => state.spots.oneSpot)
  const spotImage = useSelector(state => state.spots.oneSpot.spotImages)
  // // console.log("thisspot",thisSpot)
  const [address, setAddress] = useState(thisSpot.address)
  const [city, setCity] = useState(thisSpot.city)
  const [state, setState] = useState(thisSpot.state)
  const [country, setCountry] = useState(thisSpot.country)
  const [lat, setLat] = useState(thisSpot.lat)
  const [lng, setLng] = useState(thisSpot.lng)
  const [name, setName] = useState(thisSpot.name)
  const [description, setDescription] = useState(thisSpot.description)
  const [price, setPrice] = useState(thisSpot.price)
  const [errorMessages, setErrorMessages] = useState([]);
  // const firstImg = thisSpot.SpotImages[0]
  const [url, setUrl] = useState(spotImage)
  // const [url,setUrl] = useState()
  const [preview, setPreview] = useState(true)
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectedSpot(spotId))
  }, [dispatch])
  useEffect(() => {
    setCity(thisSpot.city)
    setAddress(thisSpot.address)
    setState(thisSpot.state)
    setCountry(thisSpot.country)
    setLat(thisSpot.lat)
    setLng(thisSpot.lng)
    setName(thisSpot.name)
    setPrice(thisSpot.price)
    setDescription(thisSpot.description)
  }, [thisSpot])
  useEffect(() => {
    const errors = []
    // if(!address)errors.push("Street address is required")
    // if(!state)errors.push("State is required")
    // if(!country)errors.push("Country is required")
    // if(!city)errors.push("City is required")
    // if(!description)errors.push("Description is required")
    // const number = ("1","2","3","4","5","6","7","8","9","0")
    const num1 = ("1")
    const num2 = ("2")
    const num3 = ("3")
    const num4 = ("4")
    const num5 = ("5")
    const num6 = ("6")
    const num7 = ("7")
    const num8 = ("8")
    const num9 = ("9")
    const num0 = ("0")
    if (!(price > 0)) errors.push("Price per day is invalid")
    if (!((lat >= 0) || (lat < 0))) errors.push("Latitude is not valid")
    if (!((lng >= 0) || (lng < 0))) errors.push("Longitude is not valid")
    if (!!((country?.includes(num1)) || (country?.includes(num2)) ||
      (country?.includes(num3)) || (country?.includes(num4)) || (country?.includes(num5)) ||
      (country?.includes(num6)) || (country?.includes(num7)) || (country?.includes(num8)) ||
      (country?.includes(num9)) || (country?.includes(num0)))) errors.push("country can not contain numbers")
    // if(!(lng>=0))errors.push("Longitude is not valid")
    // if(!(lat>=0||lat<0))errors.push("Latitude is not valid")
    // if(isNaNlng)errors.push("Longitude is not valid")
    // if(!name)errors.push("Name is required")

    // if(name.length>50)errors.push("Name must be less than 50 characters")
    setErrorMessages(errors)
  }, [price, lat, lng, country])
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

    // const payloadImage = {
    //   url,
    //   preview:true
    // }
    //!!START SILENT
    let spotupdated = await dispatch(editThisSpot(payload, thisSpot.id));
    //!!END
    if (spotupdated) {
      //!!START SILENT
      // let imagecreated = await dispatch(createSpotImage(payloadImage,thisSpot.id))
      dispatch(getSelectedSpot(spotId))
      dispatch(getAllSpots())
      history.push('/');
    }
    console.log("errormshshhs", setErrorMessages)
  }

  return (


    <form className="spotC" onSubmit={handleSubmit}>
      <div className='title'>Update Your Unit</div>
      <div className='line'></div>
      <div className='errormsg'>
        {errorMessages.map((error, idx) => (
          <div key={idx}>{error}</div>))}
      </div>
      <div className="welcome"></div>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Name"
          type="text"
          maxLength={50}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Address"
          type="text"
          maxLength={255}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Description"
          type="text"
          maxLength={255}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Latitutde"
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Longitude"
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="State"
          type="text"
          maxLength={255}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label className='rect2'>
        <input className='rectangles2'
          placeholder="Country"
          type="text"
          maxLength={255}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <div className="hostwrap">
      <button id='host'disabled={!!errorMessages.length} className="createspot" type="submit"><div className='hosttext'>Confirm</div></button>
      </div>
    </form>


  )
}
export default EditMySpot;