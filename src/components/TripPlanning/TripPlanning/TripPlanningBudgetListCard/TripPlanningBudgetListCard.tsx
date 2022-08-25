import React, { useState } from "react";
import "./TripPlanningBudgetListCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Card, Dropdown, Menu, Space } from "antd";
import "antd/dist/antd.min.css";
import { getKeysFromObject } from "../../../../utils/helpers";
import Swal from "sweetalert2";

interface Props {
  itineraryData: any;
  tripDays: any;
  setItineraryData: any;
  tripPlanningData: any;
  setTripPlanningData: any;
  item: any;
  liked: any;
  isBucketListLoading: any;
}

const TripPlanningBudgetListCard = ({
  tripDays,
  itineraryData,
  tripPlanningData,
  setTripPlanningData,
  item,
  liked,
  isBucketListLoading,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
  const [selectedItemType, setSelectedItemType] = useState<null | string>(null);

  const data: any = [];

  for (let i = 0; i < tripDays.length; i++) {
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
      // add the item amount to the spent budget
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

  return (
    <div key={item.id} className="trip_planning_budget_card_container">
      {isBucketListLoading ? (
        <Card
          style={{
            width: "100%",
            height: "100%",
          }}
          loading={isBucketListLoading}
        ></Card>
      ) : null}
      {!isBucketListLoading ? (
        <>
          <div className="trip_planning_budget_image_container">
            <img
              className="trip_planning_budget_image"
              src={item.imageUrl.toString()}
              alt={item.title}
            />
          </div>
          <div className="trip_planning_budget_card_details">
            <p className="trip_planning_budget_card_title">{item.title}</p>
            <hr />
            <div className="card_price_review">
              <p className="trip_planning_budget_card_price">
                {" "}
                from {item.price}
              </p>
              <p className="trip_planning_budget_card_price">
                {" "}
                {/* {reviews?.map((item) => {
                newLocal.review += rating;
              })}{" "} */}
                <AiFillStar /> &nbsp;
                {item.reviews?.length}
              </p>
            </div>
          </div>
          <div className="arrow">
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
          </div>
          <div className="heart">
            <p className={liked ? "heart_tag_liked" : "heart_tag"}>
              <BsSuitHeartFill />
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TripPlanningBudgetListCard;
