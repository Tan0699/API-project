import { Link, NavLink, Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAllSpots, getSelectedSpot } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteThisSpot } from '../../store/SpotsReducer';
import { useHistory } from 'react-router-dom';
import { deleteThisReview, getSelectedReview } from '../../store/ReviewsReducer';
import './SpotDetails.css';

const ShowSpot = ()=> {
const {spotId} = useParams()
const dispatch = useDispatch()
const history= useHistory()
const getspot = useSelector(state => state.spots.oneSpot)
const getReviews = useSelector(state => state.rev.oneReview.Reviews)
const staterev = useSelector(state => state.rev)
// console.log("reviews",getReviews)
// console.log("getspot:",getspot)
const getspotImages = getspot.SpotImages

// console.log("getspotImages", getspotImages)

const imageUrl = getspotImages


// console.log("imageUrl=>",imageUrl)
const sessionUser = useSelector((state) => state.session.user);
// console.log("sessionuser",sessionUser)
// console.log("getSpotowner",getspot.ownerId)

useEffect( ()=>{
   dispatch(getSelectedSpot(spotId))
   dispatch(getSelectedReview(spotId))
    // console.log("show reviews pls",getSelectedReview(spotId))
    // console.log("show spotId",spotId)
},[dispatch,spotId])
const revValues = getReviews
// console.log("values",revValues)
// function loop() {
//     for (let i = 0 ; i <getReviews.Reviews.length;i++){
//         return {
            // console.log("send help2",revValues)
            // console.log("send help",sessionUser.id)
//         }
//     }
// }
const nodupeReview = revValues?.filter(review =>((
    review.userId===sessionUser?.id)))
    // const onlyone = revValues?.filter(review =>((
    //     review.userId!==sessionUser?.id)))
// console.log("one rev",onlyone)
console.log("only1rev",nodupeReview)
if(!getReviews) return null
// console.log("rev",revValues)
const helper = async (reviewId) =>{
    await dispatch(deleteThisReview(reviewId))
    setTimeout(
    () =>{
        dispatch(getSelectedReview(spotId))
        dispatch(getSelectedSpot(spotId))
    },1)

    // dispatch(deleteThisSpot(getspot.id)
    
}
const helper2 = async () =>{
    await dispatch(deleteThisSpot(getspot.id))
    setTimeout(
    () =>{
        
        
        // dispatch(getSelectedSpot(getspot.id))
        dispatch(getAllSpots())
        //  history.push('/')
    },1000)


}

return (
    <div className="Container">


        <div className='page'>
         <div className="pics">
         <div className='name'>{getspot.name}</div>
         <div className='text'>
        <div className='star'>★{getspot.avgRating}</div>
        <div className='dot'> · </div>
        <div className='rev'>{getspot.numReviews} Reviews </div>
        <div className='dot2'> · </div>
        <div className='city'>{getspot.city} ,  </div>
        <div className='state'>{getspot.state} , </div>
        <div className='country'>{getspot.country}</div>
        </div>
        <img className='pic1' src={`${imageUrl?.[0]?.url}`}/> 
        <div>
            <div className='belongs'>Entire rental Unit hosted by {getspot.Owner.firstName} {getspot.Owner.lastName} </div>
            <div className='text2'>1+ friends · 1room · 0 beds · 0 baths · 1 floor </div>
            <div className='icon'>
            <i class="fa-sharp fa-solid fa-cat"></i></div>
        
            <div className='solid'></div>
            <div className='solid2'></div>
        </div>   
        {/* <img src={`${imageUrl?.[1]?.url}`}/>  
        <img src={`${imageUrl?.[2]?.url}`}/>
        <img src={`${imageUrl?.[3]?.url}`}/>
        <img src={`${imageUrl?.[4]?.url}`}/> */}
       
        {/* {!!(getReviews.Reviews)?<div> */}
        {/* <div>{getReviews.Reviews?.[0]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[0]?.review}</div>
        <div>{getReviews.Reviews?.[0]?.stars}</div>
        <div>{getReviews.Reviews?.[1]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[1]?.review}</div>
        <div>{getReviews.Reviews?.[1]?.stars}</div>
        <div>{getReviews.Reviews?.[2]?.User.firstName}</div>
        <div>{getReviews.Reviews?.[2]?.review}</div>
        <div>{getReviews.Reviews?.[2]?.stars}</div> */}
       {/* {revValues.forEach((revi) =>{
          //{review.id}
       })} */}

       <div className='cancel'>
        
       <div className='cry'><i class="fa-sharp fa-solid fa-face-sad-cry"></i>  </div>
       <div className='sadge'>Cancellations will make your pet friend sad</div>
        </div>
        <div className='solid'></div>
        <div className='solid2'></div>
        {revValues?.map((review)=>(
            <div key={review.id}>
              {review.User.firstName}  {review.stars}★ {review.review}  {review.userId===sessionUser?.id? <button  onClick={()=>(helper(review.id))}
        >DELEETE REV</button>:null}
            </div>
        ))}
       </div>







        {/* </div>:null} */}
      
        
        <div>{!!sessionUser?<div>{(sessionUser.id===getspot.ownerId)?
        <NavLink to='/'>
        <button  onClick={()=>(helper2())}
        >DELEETE SPOT</button>
        </NavLink>
        :null}
        </div>: null}
        </div>



        <div>{!!sessionUser?<div>{(sessionUser.id===getspot.ownerId)?
        <NavLink to={`/spots/${getspot.id}/edit`}>
        <button 
        >UPDATTE</button>
        </NavLink>
        :null}
        </div>: null}
        </div>

        
        
        {/* {revValues.filter(())} */}
        {/* &&!nodupeReview */}
        {/* {!nodupeReview? */}
        {/* {revValues?.map((review)=>(
            <div key={review.id}>
               {(review.userId!=sessionUser?.id)
               &&((sessionUser?.id !==getspot?.ownerId )
                && (!nodupeReview.length)
                &&!!sessionUser)? 
               <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
               <button>LEAVE A REV</button>{console.log("review Id",review.userId,typeof review.userId)}{console.log("sessionUser Id",sessionUser.Id,typeof review.userId)}
                </NavLink>
                :null}
            </div>
        ))} */}


               <div>
                {!!sessionUser&&(!nodupeReview.length)&&(sessionUser?.id !==getspot?.ownerId )? <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
               <button>LEAVE A REV</button>
                </NavLink> :null}
               </div>

                    {/* the review.userId  */}
              
        {/* <div>{(!!sessionUser)?<div>{!(sessionUser.id===getspot.ownerId)?
        <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
        <button 
        >LEAVE A REVIEW</button>
        </NavLink>
        :null} */}
        
        {/* </div>: null */}
        {/* </div> */}
        {/* <NavLink to={`/spots/${getspot.id}`}> */}
        {/* // <div>{!!sessionUser?<div>{!(sessionUser.id===getspot.ownerId)? */}
        {/* // <NavLink to={`/`}> */}
        {/* // <button  onClick={()=>dispatch(deleteThisReview(getReviews?.[0]?.id))} */}
        {/* // >DELEETE REV</button> */}
        {/* // </NavLink> */}
        {/* // :null} */}
        
        {/* // </div>:null} */}





        </div>
        {/* </div> */}
        </div>
    
)
}       
                                                




export default ShowSpot;