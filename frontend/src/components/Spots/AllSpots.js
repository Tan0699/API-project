import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots } from '../../store/SpotsReducer';
import { useEffect } from 'react';

const ShowAllSpots = ()=> {
const theSpots = useSelector(state => Object.values(state.spots.everySpot))
console.log("pop",theSpots)
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getAllSpots())
},[dispatch])

return (
    <div className="Container">
        <div>lmao</div>
            <div className="alltheSpots">
                {theSpots.map(spot =>(  
                <div key={spot.id} className="oneSpot">
                    <img src={`${spot.previewImage}`}/>
                    <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
                    <div>$price {spot.price} night</div>
                    <div>{spot.avgRating}★</div>
                </div>
                ))}
            </div>
    </div>
)
}       




export default ShowAllSpots;