import { useState } from "react";
import "./TripCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  currencySymbolHelper,
  getKeysFromObject,
  localGetUserId,
} from "../../../utils/helpers";
import Swal from "sweetalert2";
import { Dropdown, Menu, Space } from "antd";

interface Props {
  item: any;
  liked: any;
  handleLikeButton: any;
  handleUnLikeButton?: any;
  url?: string;
  tripPlanning?: boolean;
  itineraryData?: any;
  tripDays?: any;
  tripPlanningData?: any;
  setTripPlanningData?: any;
}

const Card = ({
  item,
  liked,
  handleLikeButton,
  handleUnLikeButton,
  url,
  tripPlanning,
  itineraryData,
  tripDays,
  tripPlanningData,
  setTripPlanningData,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
  const [selectedItemType, setSelectedItemType] = useState<null | string>(null);

  const data: any = [];

  for (let i = 0; i < tripDays?.length; i++) {
    data.push({
      label: `${tripDays[i].month} ${tripDays[i].date}`,
      key: i,
    });
  }

  const onClick = ({ key }) => {
    // get the dateClicked from the tripDays array
    const itineraryDay = itineraryData[key];

    // //check if it's already in the list
    const isInList = itineraryDay.itineraries.find(
      (item) =>
        item.item.id === selectedItemId &&
        item.item.itemType === selectedItemType
    );

    if (isInList) {
      Swal.fire({
        title: "Error!",
        text: "Item already added to the date",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      if (tripPlanningData.spentBudget + item.price > tripPlanningData.budget) {
        return Swal.fire({
          title: "Error!",
          text: "Item cannot be added, you budget is running low. Try increasing your budget, and try again.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      // push the data into the itinerary Day array gotten from the whole array
      itineraryDay.itineraries.push({
        item, // item from explore
        customNote: "",
        startTime: "",
        endTime: "",
        numberOfPeople: tripPlanningData.numberOfTraveler,
        customNoteStatus: false,
        mapColor: tripPlanningData.tripDaysColors[key],
      });
      setTripPlanningData({
        ...tripPlanningData,
        spentBudget:
          tripPlanningData.spentBudget +
          parseInt(item.price) * parseInt(tripPlanningData.numberOfTraveler),
      });
      // on successful, display success message
      Swal.fire({
        title: "Success!",
        text: "You have successfully added it to the list",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
    // set selected item id and type to null
    setSelectedItemId(null);
    setSelectedItemType(null);
  };

  const menu = <Menu onClick={onClick} items={data} />;

  const userId = localGetUserId();
  return (
    <>
      <div className="card_container">
        <div className="trip_card_image_container">
          <Link
            target={tripPlanning ? "_blank" : "_parent"}
            to={url ? url : `/explore-details/attraction/${item.id}`}
          >
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
          <Link
            target={tripPlanning ? "_blank" : "_parent"}
            to={url ? url : `/explore-details/attraction/${item.id}`}
          >
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
          {tripPlanning ? (
            <div className="arrow_tag">
              <Dropdown overlay={menu} trigger={["click"]}>
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedItemId(item.id);
                    setSelectedItemType(item.itemType);
                  }}
                >
                  <Space>
                    <IoIosArrowDown />
                  </Space>
                </span>
              </Dropdown>
            </div>
          ) : (
            <p className="arrow_tag">
              <IoIosArrowDown />
            </p>
          )}
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
