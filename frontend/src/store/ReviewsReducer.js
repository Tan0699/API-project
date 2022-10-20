import { csrfFetch } from './csrf';

const ONE_REVIEW = 'reviews/one'

const CREATE_REVIEW = 'reviews/create'

const getReview = (review) =>{
    return {
        type:ONE_REVIEW,
        review
    }
}
const newReview = (review) =>{
  return {
      type:CREATE_REVIEW,
      review
  }
}
export const getSelectedReview = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(getReview(list));
      return list
    }
  };
  export const createReview = (data,spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
  },

      body: JSON.stringify(data)
    })
    if (response.ok) {
      const list = await response.json();
      dispatch(newReview(list));
      return list
    }
  };


const initialState = {
    everyReview: {},
    oneReview:{}
  };
const ReviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case ONE_REVIEW: 
          newState = {...state,everyReview:{...state.everyReview}}
          // console.log("newState=>",newState)
          newState.oneReview=action.review
          return newState
     case CREATE_REVIEW: 
          newState = {...state,everyReview:{...state.everyReview}}
          // console.log("newState=>",newState)
          newState.oneReview=action.review
          return newState
    default:
        return state;
}
}
export default ReviewsReducer