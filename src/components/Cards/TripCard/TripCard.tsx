import React from "react";
import "./TripCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { currencySymbolHelper, localGetUserId } from "../../../utils/helpers";

interface Props {
  item: any;
  liked: any;
  handleLikeButton: any;
  handleUnLikeButton?: any;
  url?: string;
}

const Card = ({
  item,
  liked,
  handleLikeButton,
  handleUnLikeButton,
  url,
}: Props) => {
  // const newLocal = { review: 0, }
  // const [attractionData, setAttractionData] = useState(data);

  //   const handleLikeButton = (e): void => {
  //     console.log(e.target.item.id);
  //     const data1 = data.filter((item) => item.id.toString() === e.target.item.id);
  //     data1[0].liked = !data[0].liked;
  //     console.log(data1);
  //     setAttractionData([...attractionData]);
  //   };
  const userId = localGetUserId();
  return (
    <>
      <div className="card_container">
        <div className="trip_card_image_container">
          <Link to={url ? url : `/explore-details/attraction/${item.id}`}>
            <img
              className="trip_card_image"
              src={
                item.imageUrl
                  ? item.imageUrl.toString()
                  : item?.photos[0]?.photoUrl.toString()
              }
              alt={item.title}
            />
          </Link>
        </div>
        <div className="card_details">
          <Link to={url ? url : `/explore-details/attraction/${item.id}`}>
            <p className="card_title">{item.title}</p>
          </Link>
          <p className="card_description">
            {item.description.slice(0, 100)}...
          </p>
          <hr />
          <div className="card_price_review">
            <p className="card_price">
              {" "}
              from {currencySymbolHelper(item.currency)}
              {item.price}
            </p>

            <p className="card_price"> {item.ratings?.length} reviews</p>
            {/* <p className="price"> {item.ratings?.map((item) => { 
                            newLocal.review += rating
                        })} {item.ratings?.length} item.ratings</p> */}
          </div>
        </div>
        <div className="arrow">
          <p className="arrow_tag">
            <IoIosArrowDown />
          </p>
        </div>
        {userId ? (
          <div
            className="heart"
            onClick={
              liked
                ? () => handleUnLikeButton(item.id)
                : () => handleLikeButton(item.id)
            }
          >
            <p className={liked ? "heart_tag_liked" : "heart_tag"}>
              <BsSuitHeartFill />
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Card;
