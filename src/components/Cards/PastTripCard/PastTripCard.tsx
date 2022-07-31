import "./PastTripCard.css";
// import { IoIosArrowDown } from "react-icons/io";

const PastTripCard = ({ image, title, description, price, reviews, liked }) => {
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
