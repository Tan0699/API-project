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
const deletedspot = (spotId) =>{
  return {
      type:DELETE_SPOT,
      spotId
  }
}
const editASpot = (spot) =>{
  return {
      type:EDIT_SPOT,
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
    method: 'POST',
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
  export const deleteThisSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'DELETE',
    })
    if (response.ok) {
      dispatch(deletedspot(spotId));
    }
  }
  export const editThisSpot = (data,spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`,{
    method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const list = await response.json();
      dispatch(editASpot(list));
    }
  }
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
          // console.log("newState=>",newState)
          newState.everySpot[action.spot.id]=action.spot
        ;
        return newState
          ;
          case DELETE_SPOT: 
          newState = {...state,everySpot:{...state.everySpot}}
          // console.log("newState=>",newState)
          delete newState.everySpot[action.spotId]
        ;
        return newState
          ;
          case EDIT_SPOT: 
          newState = {...state,oneSpot:{...state.oneSpot}}
          console.log("newState=>",newState)
          newState.oneSpot[action.spot.id] = action.spot
          console.log("newState22 =>>",newState)
        ;
        return newState
      default:
        return state;
    }
  }
export default SpotsReducer