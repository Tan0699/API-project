import { csrfFetch } from './csrf';

const ALL_SPOTS = 'spots/allSpots'
const OWNER_SPOTS = 'spots/ownerSpots'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const CREATE_SPOT = 'spots/createSpot'
const SPOT_DETAILS = 'spots/spotDetails'
const SPOT_IMAGE = 'spots/image'

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
const addSpotImage = (image) =>{
  return {
      type:EDIT_SPOT,
      image
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
      return list
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
      return list
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
      return list
    }
  }
  export const createSpotImage = (data,spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const list = await response.json();
      dispatch(addSpotImage(list));
      return list
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
          newState = {...state,everySpot:{...state.everySpot},oneSpot:{}}
          // console.log("newState=>",newState)
          newState.oneSpot=action.spot
        ;
        return newState
          ;
          case CREATE_SPOT: 
          // console.log("normalState",state)
          newState = {...state,everySpot:{...state.everySpot}}
          // console.log("newState=>",newState)
          newState.everySpot[action.spot.id]=action.spot
          // console.log("newState returned", newState)
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
          // console.log("normal state",state)
          // newState = {...state}
          newState = {...state,oneSpot:{...state.oneSpot}}
          // console.log("newState=>",newState)
          newState.oneSpot[action.spotId] = action.spot
          // console.log("newState22 =>>",newState)
        ;
        return newState
        case SPOT_IMAGE: 
          newState = {...state}
          newState.oneSpot.SpotImage = action.spotId.url
          console.log("newStateimage",newState)
        ;
        return newState
      default:
        return state;
    }
  }
export default SpotsReducer