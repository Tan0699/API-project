import { Link, NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { createSpotImage, getAllSpots, newSpotCreate } from '../../store/SpotsReducer';
import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/ReviewsReducer';
import { useParams } from 'react-router-dom';
const ReviewsCreateForm = ()=> {


  //review.length must not be greater than 255



    const [review,setReview] = useState("")
    const [stars,setstars] = useState()
    const history = useHistory();
const dispatch= useDispatch();
const thisSpot = useSelector(state => state.spots)
const {spotId} = useParams()
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
        
        <label>
          <input
          placeholder="Leave a Review"
            type="text"
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
        

        <button className="createREV" type="submit">create dis dis</button>
      </form>
      </>
    );
  }

export default ReviewsCreateForm;