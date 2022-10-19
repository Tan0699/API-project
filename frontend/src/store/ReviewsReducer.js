import { csrfFetch } from './csrf';

const ONE_REVIEW = 'reviews/one'

const getReview = (review) =>{
    return {
        type:ONE_REVIEW,
        review
    }
}
export const getSelectedReview = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
  
    if (response.ok) {
      const list = await response.json();
      dispatch(getReview(list));
    }
  };


const initialState = {
    everyReview: {},
    oneReview:{}
  };
const ReviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
    default:
        return state;
}
}
export default ReviewsReducer