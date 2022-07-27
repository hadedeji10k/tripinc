import React, { useState } from "react";
import "./TripPlanningBudgetListCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { Card, Dropdown, Menu, Space } from "antd";
import "antd/dist/antd.min.css";
import { getKeysFromObject } from "../../../utils/helpers";
import Swal from "sweetalert2";

interface Props {
  itineraryData: any;
  setItineraryData: any;
  wishListData: any;
  itemId: any;
  image: any;
  title: any;
  price: any;
  reviews: any;
  liked: any;
  isBucketListLoading: any;
}

const TripPlanningBudgetListCard = ({
  itineraryData,
  setItineraryData,
  wishListData,
  itemId,
  image,
  title,
  price,
  reviews,
  liked,
  isBucketListLoading,
}: Props) => {
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  const itineraryDays = getKeysFromObject(itineraryData);
  const data: any = [];

  for (let i = 0; i < itineraryDays.length; i++) {
    data.push({
      label: `${itineraryDays[i]}`,
      key: i,
    });
  }

  const onClick = ({ key }) => {
    // get the dateClicked from the itineraryDays array
    const dateClicked = itineraryDays[key];
    // get the selected date array from the itineraryData
    const itineraryDay = itineraryData[dateClicked];

    // get the selected item from the wishListData
    const selectedItemFromWishlist = wishListData.find(
      (item) => item.id === selectedItem
    );

    //check if it's already in the list
    const isInList = itineraryDay.find((item) => item.id === selectedItem);

    if (isInList) {
      Swal.fire({
        title: "Error!",
        text: "Item already added to the date",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      itineraryDay.push(selectedItemFromWishlist);
      setItineraryData({
        ...itineraryData,
        [dateClicked]: itineraryDay,
      });
      // on successful, display success message
      Swal.fire({
        title: "Success!",
        text: "You have successfully added it to the list",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }

    console.log(selectedItem);

    console.log(itineraryData);

    // set selected item to null
    setSelectedItem(null);
  };

  const menu = <Menu onClick={onClick} items={data} />;

  return (
    <div key={itemId} className="trip_planning_budget_card_container">
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
              src={image.toString()}
              alt={title}
            />
          </div>
          <div className="trip_planning_budget_card_details">
            <p className="trip_planning_budget_card_title">{title}</p>
            <hr />
            <div className="card_price_review">
              <p className="trip_planning_budget_card_price"> from {price}</p>
              <p className="trip_planning_budget_card_price">
                {" "}
                {/* {reviews?.map((item) => {
                newLocal.review += rating;
              })}{" "} */}
                <AiFillStar /> &nbsp;
                {reviews?.length}
              </p>
            </div>
          </div>
          <div className="arrow">
            <div className="arrow_tag">
              <Dropdown overlay={menu} trigger={["click"]}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedItem(itemId);
                  }}
                >
                  <Space>
                    <IoIosArrowDown />
                  </Space>
                </a>
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
