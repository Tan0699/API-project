import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots } from '../../store/SpotsReducer';
import { useEffect } from 'react';
const dispatch = useDispatch()
const ShowAllSpots = ()=> {
const theSpots = useSelector(state => {
    state.spots
})
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(getAllSpots())
},[dispatch])
}

return (
    <div className="Container">
            <div className="alltheSpots">
                {theSpots.map(spot =>{
                <div key={spot.id} className="oneSpot">
                    <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
                </div>
                })}
            </div>
    </div>
)





export default AllSpots;