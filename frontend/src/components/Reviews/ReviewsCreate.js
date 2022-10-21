import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { createSpotImage, getAllSpots, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/ReviewsReducer';
import { useParams } from 'react-router-dom';
const ReviewsCreateForm = ()=> {
  //review.length must not be greater than 255
  const [errorMessages, setErrorMessages] = useState([]);
    const [review,setReview] = useState("")
    const [stars,setstars] = useState()
    const history = useHistory();
const dispatch= useDispatch();
const thisSpot = useSelector(state => state.spots)
const {spotId} = useParams()
useEffect(()=>{
  const errors = []
  // if((!!((stars<1) ||(stars>5))))errors.push("Please rate between 1 and 5")
  // if(!(r>=0))errors.push("Price per day is invalid")
  setErrorMessages(errors)
},[])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          stars,
          review
        };
    
        //!!START SILENT
        let reviewCreate = await dispatch(createReview(payload,spotId));
        if (reviewCreate) {

          // if(imagecreated){
            history.push(`/spots/${spotId}`)
          // }
        }
    }










    return (
    
        <>
      <form className="s" onSubmit={handleSubmit}>
        {/* <div className="welcome">plsworkpepeASDFFHDSAJFIADJSJIADSFJIAFDSJIAFDSJI</div> */}
        <div>
      {errorMessages.map((error,idx) => (
        <div key={idx}>{error}</div>))}
        </div>
        <label>
          <input
          placeholder="Leave a Review"
            type="text"
            maxLength={255}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          <input
          placeholder="Rate this"
            type="text"
            value={stars}
            max={5}
            min={1}
            onChange={(e) => setstars(e.target.value)}
            required
          />
        </label>
        

        <button disabled={!!errorMessages.length} className="createREV" type="submit">create dis dis</button>
      </form>
      </>
    );
  }

export default ReviewsCreateForm;