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
    console.log("response",response)
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



const DELETE_REVIEW = 'reviews/delete'

const deleteReview = (reviewId) =>{return {type:DELETE_REVIEW,reviewId}}

 export const deleteThisReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
    method: 'DELETE',})
    if (response.ok){
     const data = await response.json()
     dispatch(deleteReview(reviewId))
     return data
     ;}};

const initialState = {everyReview: {},oneReview:{}};
const ReviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case ONE_REVIEW: 
          newState = {...state,everyReview:{...state.everyReview},oneReview:{}}
          // console.log("newState=>",newState)
          newState.oneReview=action.review
          return newState
     case CREATE_REVIEW: 
          newState = {...state,everyReview:{...state.everyReview}}
          // console.log("newState=>",newState)
          newState.oneReview=action.review
          return newState
    case DELETE_REVIEW: 
          newState = {...state,everyReview:{...state.everyReview},oneReview:{...state.oneReview.Reviews}}
          // console.log("newState=>",newState)
          const revarray = Object.values(newState?.oneReview)
          console.log("revarray",revarray)
          const index = revarray.find((review)=>review.id ===action.reviewId)
          // delete newState.oneReview.Reviews[index]
          revarray.splice(index,1)
          // newState.oneReview
          return newState
    default:
        return state;
}
}
export default ReviewsReducer