import { Link, NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, getSelectedSpot } from '../../store/SpotsReducer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteThisSpot } from '../../store/SpotsReducer';
import { useHistory } from 'react-router-dom';
import { deleteThisReview, getSelectedReview } from '../../store/ReviewsReducer';
import './SpotDetails.css';

const ShowSpot = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
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

    useEffect(() => {
        dispatch(getSelectedSpot(spotId))
        dispatch(getSelectedReview(spotId))
        // console.log("show reviews pls",getSelectedReview(spotId))
        // console.log("show spotId",spotId)
    }, [dispatch, spotId])
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
    const nodupeReview = revValues?.filter(review => ((
        review.userId === sessionUser?.id)))
    // const onlyone = revValues?.filter(review =>((
    //     review.userId!==sessionUser?.id)))
    // console.log("one rev",onlyone)
    console.log("only1rev", nodupeReview)
    if (!getReviews) return null
    // console.log("rev",revValues)
    const helper = async (reviewId) => {
        await dispatch(deleteThisReview(reviewId))
        setTimeout(
            () => {
                dispatch(getSelectedReview(spotId))
                dispatch(getSelectedSpot(spotId))
            }, 1)

        // dispatch(deleteThisSpot(getspot.id)

    }
    const helper2 = async () => {
        await dispatch(deleteThisSpot(getspot.id))
        setTimeout(
            () => {


                // dispatch(getSelectedSpot(getspot.id))
                dispatch(getAllSpots())
                //  history.push('/')
            }, 1000)


    }

    return (
        <div className="Container">

            <div className='page'>





                <div className="pics">
                    <div className='name'>{getspot?.name}</div>
                    <div className='text'>
        
                        <div className='star'>★{getspot?.avgRating}</div>
                        <div className='dot'> · </div>
                        <div className='rev'>{getspot?.numReviews} Reviews </div>
                        <div className='dot2'> · </div>
                        <div className='city'>{getspot?.city} ,  </div>
                        <div className='state'>{getspot?.state} , </div>
                        <div className='country'>{getspot?.country}</div>
                    
                    </div>
                    <img className='pic1' src={`${imageUrl?.[0]?.url}`} />
                    <div className='belongs'>Entire rental Unit hosted by {getspot?.Owner?.firstName} {getspot?.Owner?.lastName} </div>
                    <div className='text2'>1+ friends · 1room · 0 beds · 0 baths · 1 floor </div>
                    <div className='icon'>
                        <i class="fa-sharp fa-solid fa-cat"></i>
                    </div>
                    <div className='solid'></div>
                    <div className='solid2'></div>
                </div>
                {/*MAKE GRID HERERE  */}

                <div className='belowpic'>
                    <div className='col1'>
                        <div className='grid1'>
                            <i class="fa-sharp fa-solid fa-door-open"></i>
                            <i class="fa-sharp fa-solid fa-otter"></i>
                            <div className='cry'><i class="fa-sharp fa-solid fa-face-sad-cry"></i></div>
                        </div>

                        <div className='grid2'>
                            <div className='check1'>Self check-in</div>
                            <div className='check2'>Check yourself in with the keypad.</div>
                            <div className='solid4'></div>
                            <div className='hosttext'>The Otts are a Superhost</div>
                            <div className='hosttext2'>Otts are cute.</div>
                            <div className='solid5'></div>
                            <div className='sadge'>Cancellations will make your pet friend sad</div>
                            <div className='solid5'></div>
                            <div className='solid8'></div>
                            <img id='aircover' src="https://i.ibb.co/dBtnzvT/aircover.png" alt="aircover" border="0"/>
                            <div className='aircovertext'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                            <div className='solid5'></div>
                            <div className='solid8'></div>
                            <div className='solid5'></div>
                        </div>
                    </div>

                    <div className='col2'>
                        <div className='square'>
                            <div className='squarecontents'>
                            <div className='topofsquare'>
                                <div className='pricenight'>
                      <div className='spotprice'>
                        ${getspot?.price}
                        
                        </div>
                        <div className='nighttext'> night </div>
                       
                      </div>
                     
                    <div className='othertwo'>
                    <div className='spotratingagain'> ★ {getspot?.avgRating}</div>
                    <div className='spotreviewsagain'> · {getspot?.numReviews}</div>
                    
                    </div>
                    <div className='square3'></div>
                    <div className='square2'>
                       <div className='square2text'> Unavailable
                       </div>
                        </div>
                    
                    </div>
                    
                      

                      </div>
                        </div>
                    </div>

                </div>

                <div className='themRevs'>
                    
                    {revValues?.map((review) => (
                        <div className='thereview' key={review.id}>
                            <div className='firstname'>
                            {review.User.firstName}
                            </div>
                            <div className='date'>
                             {review.createdAt.slice(0,7)} 
                             </div>
                            <div className='readreview'>
                             {review.review} 
                             </div>
                              {review.userId === sessionUser?.id ? <button className='delbutton' onClick={() => (helper(review.id))}
                            >Delete Your Review</button> : null}
                        </div>))}

                    <div>
                        {!!sessionUser && (!nodupeReview.length) && (sessionUser?.id !== getspot?.ownerId) ? <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
                            <button id='revButton'>Leave a Review!</button>
                        </NavLink> : null}
                    </div>

                    <div>{!!sessionUser ? <div>{(sessionUser.id === getspot.ownerId) ?
                        <NavLink to='/'>
                            <button onClick={() => (helper2())}
                            >DELEETE SPOT</button>
                        </NavLink> : null}
                    </div> : null}



                        <div>{!!sessionUser ? <div>{(sessionUser.id === getspot.ownerId) ?
                            <NavLink to={`/spots/${getspot.id}/edit`}>
                                <button>UPDATTE</button>
                            </NavLink> : null}
                        </div> : null}
                        </div>

                    </div>

                </div>
            </div>



        </div>














                

            
           
        
        



    )
}
export default ShowSpot;


{/* <img src={`${imageUrl?.[1]?.url}`}/>  
        <img src={`${imageUrl?.[2]?.url}`}/>
        <img src={`${imageUrl?.[3]?.url}`}/>
        <img src={`${imageUrl?.[4]?.url}`}/> */}

{/* {!!(getReviews.Reviews)?<div> */ }
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
{/* </div>:null} */ }



{/* {revValues.filter(())} */ }
{/* &&!nodupeReview */ }
{/* {!nodupeReview? */ }
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




{/* the review.userId  */ }

{/* <div>{(!!sessionUser)?<div>{!(sessionUser.id===getspot.ownerId)?
        <NavLink to={`/spots/${getspot.id}/reviewCreate`}>
        <button 
        >LEAVE A REVIEW</button>
        </NavLink>
        :null} */}

{/* </div>: null */ }
{/* </div> */ }
{/* <NavLink to={`/spots/${getspot.id}`}> */ }
{/* // <div>{!!sessionUser?<div>{!(sessionUser.id===getspot.ownerId)? */ }
{/* // <NavLink to={`/`}> */ }
{/* // <button  onClick={()=>dispatch(deleteThisReview(getReviews?.[0]?.id))} */ }
{/* // >DELEETE REV</button> */ }
{/* // </NavLink> */ }
{/* // :null} */ }

{/* // </div>:null} */ }



{/* </div> */ }
