import React, { useState } from "react";
import "./PastTripCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";

const PastTripCard = ({ image, title, description, price, reviews, liked }) => {
  // const newLocal = { review: 0, }
  // const [attractionData, setAttractionData] = useState(data);

  //   const handleLikeButton = (e): void => {
  //     console.log(e.target.id);
  //     const data1 = data.filter((item) => id.toString() === e.target.id);
  //     data1[0].liked = !data[0].liked;
  //     console.log(data1);
  //     setAttractionData([...attractionData]);
  //   };

  return (
    <>
      <div className="past_card_container">
        <div className="past_image_container">
          <img className="past_image" src={image.toString()} alt="" />
        </div>
        <div className="past_card_details">
          <p className="past_card_title">{title}</p>
          <p className="other_details">free wifi &nbsp; &nbsp; 30 mins ride</p>
          <div className="button_container">
            <button className="past_card_button">View Invoice</button>
          </div>
          {/* <p className="card_description">{description.slice(0, 100)}...</p> */}
          {/* <hr /> */}
          {/* <div className="card_price_review">
            <p className="price"> from {price}</p>

            <p className="price"> {reviews?.length} reviews</p>
            <p className="price"> {reviews?.map((item) => { 
                            newLocal.review += rating
                        })} {reviews?.length} reviews</p>
          </div> */}
        </div>
        {/* <div className="arrow">
          <p className="arrow_tag">
            <IoIosArrowDown />
          </p>
        </div>
        <div className="heart">
          <p className={liked ? "heart_tag_liked" : "heart_tag"}>
            <BsSuitHeartFill />
          </p>
        </div> */}
      </div>
    </>
  );
};

export default PastTripCard;
