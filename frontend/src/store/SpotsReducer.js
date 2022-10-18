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
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(allSpots(list));
    }
  };
  const initialState = {
    everySpot: {},
    oneSpot:{}
  };

  const SpotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALL_SPOTS: 
        const newState = {...state};
        console.log("action.spots",action.spots)
        action.spots.Spots.forEach(spot => {
          newState.everySpot[spot.id] = spot;
        });
        console.log("newState",newState)
        return newState
          ;
      default:
        return state;
    }
  }
export default SpotsReducer