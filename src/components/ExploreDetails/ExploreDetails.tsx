import React, { useState } from 'react'
import './ExploreDetails.css'
import { FiFlag } from 'react-icons/fi'
import { GoStar } from 'react-icons/go'
import { BsSuitHeartFill } from 'react-icons/bs'
import image from '../../images/location.png'
import { getExplore } from '../../currentUserData';

const ExploreDetails = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [reviewsData, setReviewsData] = useState(getExplore.reviews);

    const toggleDetails = (e: React.FormEvent) => {
        e.preventDefault();
        setShowDetails(!showDetails);
    }

    // reviews
    let numOfReviews = getExplore.reviews.length
    let numOfStars = getExplore.reviews.map(item => {
        return item.rating
    })
    let sum = numOfStars.reduce((a, b) => a + b, 0)
    console.log(numOfStars)
    console.log(sum)
    let average = sum / numOfReviews

      // function to handle preference click
    const handleReviewsClick = (e: any) => {
        e.preventDefault()
        // console.log(e.target.id)
        const id = e.target.id
        const index = reviewsData.findIndex(item => item.id === parseInt(id))
        for (let i = 0; i < reviewsData.length; i++) {
            reviewsData[i].stateOfClass = false
        }
        reviewsData[index].stateOfClass = !reviewsData[index].stateOfClass
        // reviewsData[index].class = reviewsData[index].stateOfClass ? 'clicked' : 'not-clicked'
        setReviewsData([...reviewsData])
    }

  return (<>
    <div className="explore_details_container">
        <div className="details_container">
            <div className="inner_container">
                <div className="title_container">
                    <h2 className="title">{getExplore.title}</h2>
                </div>
                <div>
                    <p><BsSuitHeartFill className="heart" /></p>
                </div>
            </div>
            <div className="inner_container">
                <div className="title_container">
                    <h3 className="short_title">{getExplore.time}</h3>
                </div>
            </div>
            <div className="inner_container">
                <div>
                    <p><GoStar /> &nbsp; {average.toFixed(1)} ({numOfReviews} reviews)</p>
                </div>
                <div>
                    <p><FiFlag /> &nbsp; {getExplore.location}</p>
                </div>
            </div>
        </div>
        <div className="image_container">

        </div>
        
        <div className="description">
            <p>{ showDetails ? getExplore.details : getExplore.details.slice(0, 200)}{}...</p>
            <p><button onClick={toggleDetails}>{ showDetails ? 'Show less' : 'Show more'}</button></p>
        </div>
        
        {/* <hr className="line"/> */}

        <div className="explore_container">
            <h3 className='sub_heading'>Details</h3>

        </div>

        {/* <hr className="line"/> */}

        <div className="explore_container">
            <h3 className='sub_heading'>Location</h3>
            <div className="location_image">
                <img src={image} alt="" className="location_image"/>
            </div>
        </div>

        {/* <hr className="line"/> */}

        <div className="explore_container">
            <h3 className='sub_heading'>Terms and Conditions</h3>
            <p className="sub_heading_description">{getExplore.termsAndConditions}</p>
        </div>

        <div className="explore_container">
            <h3 className='sub_heading'>Cancellation policy</h3>
            <p className="sub_heading_description">{getExplore.cancellationPolicy}</p>
        </div>

        {/* <hr className="line"/> */}

        <div className="explore_container_review">
            <h3 className='sub_heading'>Reviews</h3>
            {reviewsData.map((item, index) => (<>
                <div key={index} className="review_card">
                    <div className="review_card_image">
                        <img src={image} alt="" className="review_card_image"/>
                    </div>
                    <div className="review_card_details">
                        <div className="review_card_details_name">
                                <span className="review_card_details_name_title">{getExplore.reviews[0].name}</span> &nbsp; &nbsp; &nbsp;
                                <span className="review_card_details_name_time">{getExplore.reviews[0].time}</span> &nbsp; &nbsp;
                                <span className="review_card_details_name_rating">{getExplore.reviews[0].rating} star</span>
                        </div>
                        <div className="review_card_details_name">
                            <p className="review_card_details_review">{ item.stateOfClass ? item.review : item.review.slice(0, 2)}{}...</p>
                            <button key={item.id} id={item.id.toString()} onClick={handleReviewsClick}>{ item.stateOfClass ? 'Show less' : 'Show more'}</button>
                        </div>
                    </div>
                </div>
                </>)
            )}
        </div>

        <button>Add to Cart</button>

    </div>
    </>
  )
}

export default ExploreDetails