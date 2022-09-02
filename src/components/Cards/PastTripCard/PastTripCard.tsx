import "./PastTripCard.css";
// import { IoIosArrowDown } from "react-icons/io";
import { currencySymbolHelper } from "../../../utils/helpers";
import { BsCalendarCheck } from "react-icons/bs";

const PastTripCard = ({ image, location, budget }) => {
  return (
    <>
      <div className="past_card_container">
        <div className="past_image_container">
          <img className="past_image" src={image.toString()} alt="" />
        </div>
        <div className="past_card_details">
          <p className="past_card_title">{location}</p>
          <p className="other_details">
            <BsCalendarCheck /> March 1, 2022 - March 3, 25 2022
          </p>
          {/* <div className="button_container">
            <button className="past_card_button">View Invoice</button>
          </div> */}
          {/* <p className="card_description">{description.slice(0, 100)}...</p> */}
          <hr />
          <div className="row m_5">
            <p className="small_title"> Budget Set</p>
            <p className="">
              <b>
                {currencySymbolHelper("GBP")} {budget}
              </b>
            </p>
          </div>
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
