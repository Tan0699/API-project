import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import SpotsReducer, { getAllSpots } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import './AllSpots.css';
const ShowAllSpots = ()=> {
const theSpots = useSelector(state => Object.values(state.spots.everySpot))
console.log("pop",theSpots)
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getAllSpots())
},[dispatch])

return (
    <div className="Container">
            <div className="alltheSpots">
                {theSpots?.map(spot =>(  
                    <div>{spot?.previewImage===undefined?null:
                <div key={spot?.id} className="oneSpot">
                    <NavLink to={`/spots/${spot.id}`}>
                    
                    <div className="pictureWrap">
                       
                    <img id="picture" src={`${spot?.previewImage}`}/>
                    <div className="picturetext">
                    <div>{spot?.city},{spot?.state}</div>
                    <div className='rating'> ★ {spot?.avgRating}</div>    
                    </div>
                    <div className='nightwrap'>
                    <div className='price'>${spot?.price} </div>
                    <div className='night'>night</div>
                    
                    </div>
                    
                    </div>
                        
                    </NavLink>
                </div>
                 } </div> ))}
            </div>
    </div>
)
}       




export default ShowAllSpots;