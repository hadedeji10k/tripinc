import { useState } from "react";
// import "./AttractionCard.css";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { currencySymbolHelper, localGetUserId } from "../../../utils/helpers";
import Swal from "sweetalert2";
import { Dropdown, Menu, Space } from "antd";
import { IAddCart, IWishListData } from "../../../api/interfaces";
import { FiEdit2 } from "react-icons/fi";
import { addToCart } from "../../../api/responseHandlers";

interface Props {
  item: IWishListData;
  liked?: any;
  handleLikeButton?: any;
  handleUnLikeButton?: any;
  url?: string;
}

const BucketListCard = ({
  item,
  liked,
  handleLikeButton,
  handleUnLikeButton,
  url,
}: Props) => {
  const [selectedItemId, setSelectedItemId] = useState<null | number>(null);
  const [selectedItemType, setSelectedItemType] = useState<null | string>(null);

  const emptyData: any = [
    {
      key: 1,
      label: "No trip matches this item's location",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "add_to_cart",
      label: "Add to cart",
    },
  ];
  console.log(item.dropDown);

  const itemDropDownData = item.dropDown ? item.dropDown : [];

  const dropdownData: any = [
    ...itemDropDownData,
    {
      type: "divider",
    },
    {
      key: "add_to_cart",
      label: "Add to cart",
    },
  ];

  const onClick = ({ key }) => {
    if (key === "add_to_cart") {
      console.log("Key Clicked", key);
      const formData: IAddCart = {
        userId: localGetUserId(),
        itemId: item.id,
        itemType: item.itemType,
        itemName: item.title,
        currency: item.currency,
        unitPrice: item.price,
        quantity: 1,
        imageUrl: item.imageUrl ? item.imageUrl : item.photos[0].photoUrl,
        date: new Date(),
      };

      addToCart(formData).then((res) => {
        if (res === true) {
          Swal.fire({
            title: "Success!",
            text: "You have successfully added item to Cart.",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed || result.isDenied || result.isDismissed) {
              window.location.reload();
            }
          });
        }
      });
    } else {
      // while generating the key for this, tripId, noOfPartners and tripDate was appended to the key
      // extract them from the key
      const keyArray = key.split(",");
      console.log("Key Array", keyArray);
      Swal.fire({
        title: "Success!",
        text: "You have successfully added it to the list",
        icon: "success",
        confirmButtonText: "Ok",
      });

      // get the dateClicked from the tripDays array
      // const itineraryDay = itineraryData && itineraryData[key];
      // // //check if it's already in the list
      // const isInList = itineraryDay?.itineraries.find(
      //   (item) =>
      //     item.item.id === selectedItemId &&
      //     item.item.itemType === selectedItemType
      // );
      // if (isInList) {
      //   Swal.fire({
      //     title: "Error!",
      //     text: "Item already added to the date",
      //     icon: "error",
      //     confirmButtonText: "Ok",
      //   });
      // } else {
      //   if (tripPlanningData.spentBudget + item.price > tripPlanningData.budget) {
      //     return Swal.fire({
      //       title: "Error!",
      //       text: "Item cannot be added, you budget is running low. Try increasing your budget, and try again.",
      //       icon: "error",
      //       confirmButtonText: "Ok",
      //     });
      //   }
      //   // push the data into the itinerary Day array gotten from the whole array
      //   itineraryDay?.itineraries.push({
      //     item, // item from explore
      //     customNote: "",
      //     startTime: "",
      //     endTime: "",
      //     numberOfPeople: tripPlanningData.numberOfTraveler,
      //     customNoteStatus: false,
      //     mapColor: tripPlanningData.tripDaysColors[key],
      //   });
      //   setTripPlanningData({
      //     ...tripPlanningData,
      //     spentBudget:
      //       tripPlanningData.spentBudget +
      //       parseInt(item.price) * parseInt(tripPlanningData.numberOfTraveler),
      //   });
      //   // on successful, display success message
      //   Swal.fire({
      //     title: "Success!",
      //     text: "You have successfully added it to the list",
      //     icon: "success",
      //     confirmButtonText: "Ok",
      //   });
      // }
      // // set selected item id and type to null
      // setSelectedItemId(null);
      // setSelectedItemType(null);
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={
        item.dropDown && item.dropDown.length > 0 ? dropdownData : emptyData
      }
    />
  );

  const userId = localGetUserId();
  return (
    <>
      <div className="card_container">
        <div className="trip_card_image_container">
          <Link
            target="_blank"
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
            target="_blank"
            to={url ? url : `/explore-details/attraction/${item.id}`}
          >
            <p className="card_title">{item.title}</p>
          </Link>
          <p className="card_description">
            {item.description.slice(0, 100)}...
          </p>
          <hr />
          <div className="card_price_review">
            <p className="card_price mb-0">
              {" "}
              from {currencySymbolHelper(item.currency)}
              {item.price}
            </p>

            <p className="card_price mb-0"> {item.ratings?.length} reviews</p>
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

export default BucketListCard;
