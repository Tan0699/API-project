import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSelectedSpot } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowSpot = ()=> {
const {spotId} = useParams()
const dispatch = useDispatch()
const getspot = useSelector(state => state.spots.oneSpot)
// console.log("getspot:",getspot)

const getspotImages = getspot.SpotImages
// console.log("getspotImages", getspotImages)
const imageUrl = getspotImages
// console.log("imageUrl=>",imageUrl)
useEffect(()=>{
    dispatch(getSelectedSpot(spotId))
},[dispatch,spotId])
return (
    <div className="Container">
         <div>{getspot.name}</div>
        <img src={`${imageUrl?.url}`}/>  
        <div>{getspot.avgRating}</div>
        <div>{getspot.city}</div>
        <div>{getspot.country}</div>
        <div>{getspot.address}</div>
        <div>{getspot.description}</div>
        <div>{getspot.numReviews}</div>
        <div>{getspot.price}</div>
        <div>{getspot.state}</div>
        </div>
    
)
}       
                                                




export default ShowSpot;