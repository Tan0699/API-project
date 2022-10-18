import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spots/allSpots'
const OWNER_SPOTS = 'spots/ownerSpots'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAILS = 'spots/spotDetails'

const allSpots = (spots) =>{
    return {
        type:ALL_SPOTS,
        spots
    }
}
const selectedSpot = (spot) =>{
    return {
        type:SPOT_DETAILS,
        spot
    }
}
const createdSpot = (spot) =>{
  return {
      type:CREATE_SPOT,
      spot
  }
}
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(allSpots(list));
    }
  };
  export const getSelectedSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(selectedSpot(list));
    }
  };
  export const newSpotCreate = data => async dispatch => {
    const response = await csrfFetch(`/api/spots`,{
    method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const list = await response.json();
      dispatch(createdSpot(list));
    }
  };
  const initialState = {
    everySpot: {},
    oneSpot:{}
  };

  const SpotsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case ALL_SPOTS: 
        newState = {...state}
        // console.log("action.spots",action.spots)
        action.spots.Spots.forEach(spot => {
          newState.everySpot[spot.id] = spot;
        });
        return newState
          ;
          case SPOT_DETAILS: 
          newState = {...state,everySpot:{...state.everySpot}}
          // console.log("newState=>",newState)
          newState.oneSpot=action.spot
        ;
        return newState
          ;
          case CREATE_SPOT: 
          newState = {...state,everySpot:{...state.everySpot}}
          console.log("newState=>",newState)
          newState.allSpots[action.spot.id]=action.spot
        ;
        return newState
          ;
      default:
        return state;
    }
  }
export default SpotsReducer