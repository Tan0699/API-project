import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getSelectedSpot } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ShowSpot = ()=> {
const {spotId} = useParams()
const dispatch = useDispatch()
const getspot = useSelector(state => state.spots.oneSpot)
useEffect(()=>{
    dispatch(getSelectedSpot(spotId))
},[dispatch,spotId])

return (
    <div className="Container">{getspot.name}
    <div>lmao</div></div>
    
)
}       





export default ShowSpot;