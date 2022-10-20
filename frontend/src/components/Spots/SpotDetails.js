import { Link, NavLink, Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSelectedSpot } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteThisSpot } from '../../store/SpotsReducer';
import { deleteThisReview, getSelectedReview } from '../../store/ReviewsReducer';
const ShowSpot = ()=> {
const {spotId} = useParams()
const dispatch = useDispatch()
const getspot = useSelector(state => state.spots.oneSpot)
const getReviews = useSelector(state => state.rev.oneReview)
console.log("reviews",getReviews)
// console.log("getspot:",getspot)

const getspotImages = getspot.SpotImages
// console.log("getspotImages", getspotImages)
const imageUrl = getspotImages
// console.log("imageUrl=>",imageUrl)
const sessionUser = useSelector((state) => state.session.user);
// console.log("sessionuser",sessionUser)
// console.log("getSpotowner",getspot.ownerId)
useEffect(()=>{
    dispatch(getSelectedSpot(spotId))
    dispatch(getSelectedReview(spotId))
    console.log("show reviews pls",getSelectedReview(spotId))
},[dispatch,spotId])
return (
    <div className="Container">
         <div>{getspot.name}</div>
        <img src={`${imageUrl?.[0]?.url}`}/>  
        <img src={`${imageUrl?.[1]?.url}`}/>  
        <img src={`${imageUrl?.[2]?.url}`}/>
        <img src={`${imageUrl?.[3]?.url}`}/>
        <img src={`${imageUrl?.[4]?.url}`}/>
        <div>{getspot.avgRating}</div>
        <div>{getspot.url}</div>
        <div>{getspot.city}</div>
        <div>{getspot.country}</div>
        <div>{getspot.address}</div>
        <div>{getspot.description}</div>
        <div>{getspot.numReviews}</div>
        <div>{getspot.price}</div>
        <div>{getspot.state}</div>
        <div>{getReviews.Reviews?.[0]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[0]?.review}</div>
        <div>{getReviews.Reviews?.[0]?.stars}</div>
        <div>{getReviews.Reviews?.[1]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[1]?.review}</div>
        <div>{getReviews.Reviews?.[1]?.stars}</div>
        <div>{getReviews.Reviews?.[2]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[2]?.review}</div>
        <div>{getReviews.Reviews?.[2]?.stars}</div>
       
        <NavLink to='/'>
        <button disabled={!(sessionUser.id===getspot.ownerId)} onClick={()=>dispatch(deleteThisSpot(getspot.id))}
        >DELEETE</button>
        </NavLink>
        <NavLink to={`/spots/${getspot.id}/edit`}>
        <button disabled={!(sessionUser.id===getspot.ownerId)}
        >UPDATTE</button>
        </NavLink>
        <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
        <button 
        >LEAVE A REVIEW</button>
        </NavLink>
        {/* <NavLink to={`/spots/${getspot.id}`}> */}
        <NavLink to={`/`}>
        <button  onClick={()=>dispatch(deleteThisReview(getReviews.Reviews?.[0]?.id))}
        >DELEETE REV</button>
        </NavLink>
      
        </div>
    
)
}       
                                                




export default ShowSpot;