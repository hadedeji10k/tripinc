import "./PastTripCard.css";
// import { IoIosArrowDown } from "react-icons/io";
import {
  currencySymbolHelper,
  formatDateToMonthAndDay,
} from "../../../utils/helpers";
import { BsCalendarCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ITripPlanningData } from "../../../api/interfaces";

const PastTripCard = ({
  item,
  image,
}: {
  item: ITripPlanningData;
  image: string;
}) => {
  return (
    <>
      <div className="past_card_container">
        <div className="past_image_container">
          <Link to={`/my-trips/${item.id}`}>
            <img className="past_image" src={image.toString()} alt="" />
          </Link>
        </div>
        <div className="past_card_details">
          <Link to={`/my-trips/${item.id}`}>
            <p className="past_card_title">{item.startDestination}</p>
          </Link>
          <p className="other_details">
            <BsCalendarCheck /> {formatDateToMonthAndDay(item.startDate)} -{" "}
            {formatDateToMonthAndDay(item.endDate)}
          </p>
          {/* <div className="button_container">
            <button className="past_card_button">View Invoice</button>
          </div> */}
          {/* <p className="card_description">{description.slice(0, 100)}...</p> */}
          <hr />
          <div className="app_row m_5 justify-content-between">
            <p className="small_title"> Budget Set</p>
            <p className="">
              <b>
                {currencySymbolHelper("GBP")} {item.budget}
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
