import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import './AllSpots.css';
const ShowAllSpots = ()=> {
const theSpots = useSelector(state => Object.values(state.spots.everySpot))
// console.log("pop",theSpots)
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getAllSpots())
},[dispatch])

return (
    <div className="Container">
            <div className="alltheSpots">
                {theSpots.map(spot =>(  
                <div key={spot.id} className="oneSpot">
                    <NavLink to={`/spots/${spot.id}`}>{spot.name}
                    <img id="picture" src={`${spot.previewImage}`}/>
                    <div>$price {spot.price} night</div>
                    <div>{spot.avgRating}★</div>
                    </NavLink>
                </div>
                ))}
            </div>
    </div>
)
}       




export default ShowAllSpots;