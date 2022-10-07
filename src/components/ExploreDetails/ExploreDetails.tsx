import React, { useEffect, useState } from "react";
import { Spin, Rate } from "antd";
import GoogleMapReact from "google-map-react";
import "./ExploreDetails.css";
import { FiFlag } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { BsSuitHeartFill } from "react-icons/bs";
import CartModal from "../Cart/CartModal";
import { useParams } from "react-router-dom";
import { getAttractionByID, getTourByID, getUserWishList } from "../../api";
import { ICart, IDeal, IRatings } from "../../api/interfaces";
import { getUserProfilePicture, localGetUserId } from "../../utils/helpers";
import Swal from "sweetalert2";
import { addToWishList, removeFromWishList } from "../../api/responseHandlers";
import { GOOGLEAPIKEY } from "../../utils/constants";
import ReviewModal from "./ReviewModal/ReviewModal";
import Marker from "../TripPlanning/TripMapPlanning/Marker";

const ExploreDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState(false);

  const [itemInCart, setItemInCart] = useState(false);
  const [cartItem, setCartItem] = useState<ICart>();
  const [userLikedPost, setUserLikedPost] = useState(false);
  const [attractionData, setAttractionData] = useState<IDeal>();
  const [ratings, setRatings] = useState<IRatings[]>([]);
  const [averageRatings, setAverageRatings] = useState<number>(0);

  const [wishListData, setWishListData] = useState<IDeal[]>([]);

  const { tourId } = useParams();
  const { attractionId } = useParams();

  const userId = localGetUserId();

  // checking of network connectivity
  let condition = navigator.onLine ? "online" : "offline";
  if (condition === "online") {
    fetch("https://www.google.com/", {
      // Check for internet connectivity
      mode: "no-cors",
    })
      .then(() => {})
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "You are not connected to the internet connection, or you have slow connectivity. Please try refreshing after stable connection",
          icon: "error",
          showConfirmButton: true,
          allowEnterKey: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            window.location.href = "/";
          }
        });
      });
  } else {
    Swal.fire({
      title: "Error!",
      text: "You are not connected to the internet connection, or you have slow connectivity. Please try again",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed || result.isDenied || result.isDismissed) {
        window.location.href = "/";
      }
    });
  }

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart_data") as any);
    cart &&
      cart?.map((item) => {
        if (Number(item.itemId) === Number(attractionId)) {
          setItemInCart(true);
          setCartItem(item);
        }
        return true;
      });
    getUserWishList(userId)
      .then((res) => {
        setWishListData(res.data.items);
        const item = res.data.items.find(
          (item) => item?.id.toString() === attractionId?.toString()
        );
        if (item) {
          setUserLikedPost(true);
        } else {
          setUserLikedPost(false);
        }
      })
      .catch((err) => {
        setWishListData([]);
      });
  }, [userId, attractionId]);

  // fetch attractiondata from remote or local storage
  useEffect(() => {
    setIsLoading(true);
    // set function to attraction if attractionId is available else set it to tourId
    const fetchData = attractionId
      ? getAttractionByID(attractionId)
      : getTourByID(tourId);
    // call the function
    fetchData.then((res) => {
      console.log(res.data);
      setAttractionData(res.data);

      // ratings
      const reviews = res.data.ratings;
      reviews.forEach(async (rating, index) => {
        const image = await getUserProfilePicture(rating.userId);
        const data = {
          id: index,
          userId: rating.userId,
          fullName: rating.fullName,
          attractionId: rating.attractionId,
          rating: rating.rating,
          comment: rating.comment,
          stateOfClass: false,
          image,
        };
        setRatings((prev) => [...prev, data]);
      });

      const numOfRatings = res.data.ratings.length;
      if (numOfRatings > 0) {
        const starsArray = res.data.ratings.map((item) => {
          return item.rating;
        });

        const sum = starsArray.reduce((a, b) => a + b, 0);
        const average = sum / numOfRatings;
        setAverageRatings(average);
      } else {
        setAverageRatings(0);
      }
      setIsLoading(false);
    });
  }, [attractionId, tourId]);

  const toggleShowCartModal = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCartModal(!showCartModal);
  };

  const toggleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  // function to handle preference click
  const handleReviewsClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = ratings.findIndex((item) => item.id === parseInt(id));
    // for (let i = 0; i < ratings.length; i++) {
    //   ratings[i].stateOfClass = false;
    // }
    ratings[index].stateOfClass = !ratings[index].stateOfClass;
    // ratings[index].class = ratings[index].stateOfClass ? 'clicked' : 'not-clicked'
    setRatings([...ratings]);
  };

  const AnyReactComponent = ({ text, lat, lng }) => (
    <div style={{ color: "red" }}>{text}</div>
  );

  // like

  const handleLikeButton = async () => {
    setIsLoading(true);
    const formData = {
      userId,
      itemId: attractionData?.id,
      itemType: attractionData?.itemType,
      provider: attractionData?.provider,
      tripId: attractionData?.tourId,
    };

    const response = await addToWishList(formData);
    if (response === true) {
      setUserLikedPost(true);
      setIsLoading(false);
    }
  };

  const handleUnLikeButton = async () => {
    setIsLoading(true);
    // remove from wishList state
    const data = wishListData.filter(
      (item) => item.id.toString() !== attractionData?.id.toString()
    );
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to remove this from your bucket list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          // remove from database
          await removeFromWishList(attractionId, userId).then((res) => {
            if (res === true) {
              // set the wishListData to the new data after removing
              setWishListData([...data]);
              setIsLoading(false);
              setUserLikedPost(false);
            } else {
              setIsLoading(false);
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="explore_details_container">
          <div className="explore_details_image_container">
            <div className="explore_details_image">
              <img
                className="explore_image"
                src={
                  attractionData?.imageUrl
                    ? attractionData?.imageUrl
                    : attractionData?.photos[0].photoUrl
                }
                alt=""
              />
            </div>
          </div>
          <div className="details_container">
            <div className="inner_container">
              <div className="title_container">
                <h2 className="explore_details_title">
                  {attractionData?.title}
                </h2>
              </div>
              <div
                onClick={userLikedPost ? handleUnLikeButton : handleLikeButton}
              >
                {userId ? (
                  userLikedPost ? (
                    <p>
                      <BsSuitHeartFill className="explore_heart" />
                    </p>
                  ) : (
                    <p>
                      <BsSuitHeartFill className="explore_heart_not_liked" />
                    </p>
                  )
                ) : null}
              </div>
            </div>
            <div className="inner_container">
              <div className="title_container">
                <h3 className="short_title">
                  {attractionData?.typicalTimeSpent} min
                  {(attractionData?.typicalTimeSpent || 0) > 0 ? "s" : ""}
                </h3>
              </div>
            </div>
            <div className="inner_container">
              <div>
                <p>
                  <GoStar /> &nbsp; {averageRatings.toFixed(1)} (
                  {attractionData?.ratings.length} review{""}
                  {(attractionData?.ratings.length || 0) > 0 ? "s" : ""})
                </p>
              </div>
              <div>
                <p>
                  <FiFlag /> &nbsp; {attractionData?.location}
                </p>
              </div>
            </div>
          </div>

          <div className="explore_page_other">
            <div className="description_container">
              <div className="explore_details_description">
                <h3 className="sub_heading">Description</h3>
                {attractionData?.description ||
                attractionData?.description.length === 0 ? (
                  <>
                    <p>
                      {showDetails
                        ? attractionData?.description
                        : attractionData?.description.slice(0, 200)}
                      {}...
                    </p>
                    <p>
                      <button onClick={toggleDetails}>
                        {showDetails ? "Show less" : "Show more"}
                      </button>
                    </p>
                  </>
                ) : (
                  "N/A"
                )}
              </div>
            </div>

            {/* <hr className="line"/> */}

            <div className="explore_container">
              <h3 className="sub_heading">Details</h3>
              {attractionData && attractionData?.openingHour ? (
                <>
                  <h5>Opens: </h5>
                  <div className="explore_details_tag_container">
                    <span className="explore_details_tags medium_title">
                      {attractionData?.openingHour}
                    </span>
                  </div>
                </>
              ) : null}
              {attractionData && attractionData?.closingHour ? (
                <>
                  <h5>Closes: </h5>
                  <div className="explore_details_tag_container">
                    <span className="explore_details_tags medium_title">
                      {attractionData?.closingHour}
                    </span>
                  </div>
                </>
              ) : null}
              {attractionData && attractionData?.typicalTimeSpent ? (
                <>
                  <h5>Typical time spent: </h5>
                  <div className="explore_details_tag_container">
                    <span className="explore_details_tags medium_title">
                      {Math.floor(attractionData?.typicalTimeSpent / 60)} hour
                      {Math.floor(attractionData?.typicalTimeSpent / 60) > 1
                        ? "s"
                        : ""}{" "}
                      {" : "}
                      {(attractionData?.typicalTimeSpent % 60).toString() ||
                        0}{" "}
                      min
                      {attractionData?.typicalTimeSpent % 60 > 1 ? "s" : ""}
                    </span>
                  </div>
                </>
              ) : null}
              {attractionData && attractionData?.greatForList?.length > 0 ? (
                <>
                  <h5>Great For: </h5>
                  <div className="explore_details_tag_container">
                    {attractionData?.greatForList.map((item) => (
                      <span className="explore_details_tags medium_title">{item}</span>
                    ))}
                  </div>
                </>
              ) : null}
              {attractionData && attractionData?.openingDaysList?.length > 0 ? (
                <>
                  <h5>Opening Days: </h5>
                  <div className="explore_details_tag_container">
                    {attractionData?.openingDaysList.map((item) => (
                      <span className="explore_details_tags medium_title">{item}</span>
                    ))}
                  </div>
                </>
              ) : null}
              {attractionData &&
              attractionData?.bestVisitingTime?.length > 0 ? (
                <>
                  <h5>Best Visiting Times: </h5>
                  <div className="explore_details_tag_container">
                    {attractionData?.bestVisitingTime.map((item) => (
                      <span className="explore_details_tags medium_title">{item}</span>
                    ))}
                  </div>
                </>
              ) : null}
              {/* if no details is available, show N/A */}
              {!attractionData?.openingHour &&
              !attractionData?.closingHour &&
              !attractionData?.typicalTimeSpent &&
              !attractionData?.greatForList &&
              !attractionData?.openingDaysList &&
              !attractionData?.bestVisitingTime ? (
                <h3>N/A</h3>
              ) : null}
            </div>

            {/* <hr className="line"/> */}

            <div className="explore_container">
              <h3 className="sub_heading">Location</h3>
              <div
                className="location_image"
                style={{ height: "60vh", width: "100%" }}
              >
                {/* <img src={image} alt="" className="location_image" /> */}
                {isLoading ? null : (
                  <>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: GOOGLEAPIKEY }}
                      defaultCenter={{
                        lat: attractionData?.latitude,
                        lng: attractionData?.longitude,
                      }}
                      defaultZoom={8}
                    >
                      <Marker
                        key={attractionData?.id}
                        lat={attractionData?.latitude as any}
                        lng={attractionData?.longitude as any}
                        text={attractionData?.title as string}
                      />
                    </GoogleMapReact>
                  </>
                )}
              </div>
            </div>

            {/* <hr className="line"/> */}

            <div className="explore_container">
              <h3 className="sub_heading">Terms and Conditions</h3>
              <p className="sub_heading_description">
                {!attractionData?.termsAndConditions ||
                attractionData?.termsAndConditions.length === 0
                  ? "N/A"
                  : attractionData?.termsAndConditions}
              </p>
            </div>

            <div className="explore_container">
              <h3 className="sub_heading">Cancellation policy</h3>
              <p className="sub_heading_description">
                {!attractionData?.cancellationPolicyText ||
                attractionData?.cancellationPolicyText.length === 0
                  ? "N/A"
                  : attractionData?.cancellationPolicyText}
              </p>
            </div>

            {/* <hr className="line"/> */}
            <div className="explore_container_review">
              <h3 className="sub_heading">Reviews</h3>
              {ratings.map((item, index) => (
                <>
                  <div key={index} className="review_card">
                    <div className="review_card_image">
                      <img
                        src={item.image}
                        alt={item.fullName}
                        className="review_card_image"
                      />
                    </div>
                    <div className="review_card_details">
                      <div className="review_card_details_name">
                        <span className="review_card_details_name_title">
                          {item.fullName}
                        </span>{" "}
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="review_card_details_name_rating">
                          {/* {item.rating} star{item.rating > 0 ? "s" : ""} */}

                          <Rate
                            disabled
                            defaultValue={item.rating}
                            allowHalf={true}
                          />
                        </span>
                      </div>
                      <div className="review_card_details_name">
                        <p className="review_card_details_review">
                          {item.stateOfClass
                            ? item.comment
                            : item.comment.slice(0, 20)}
                          {}...
                        </p>
                        <button
                          key={item.id}
                          id={item.id.toString()}
                          onClick={handleReviewsClick}
                        >
                          {item.stateOfClass ? "Show less" : "Show more"}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              {ratings.length === 0 ? (
                <>
                  <p>No reviews yet.</p>
                </>
              ) : null}
              <br />
              {userId ? (
                <div className="leave_review">
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => setShowReviewModal((prev) => !prev)}
                  >
                    {showReviewModal
                      ? "Cancel review"
                      : "Click to leave a review"}
                  </p>
                </div>
              ) : (
                <>
                  <p>Want to leave a review? Kindly login</p>
                </>
              )}
            </div>

            <div className="explore_detail_button_container">
              <button
                className="explore_detail_button"
                onClick={toggleShowCartModal}
              >
                {itemInCart ? "Update Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
        <ReviewModal
          showReviewModal={showReviewModal}
          setShowReviewModal={setShowReviewModal}
          attractionId={attractionData?.id}
          attractionName={attractionData?.title}
          attractionCity={attractionData?.city}
          userId={userId}
        />
        <CartModal
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
          item={attractionData}
          itemInCart={itemInCart}
          cartData={cartItem}
          userId={userId}
        />
      </Spin>
    </>
  );
};

export default ExploreDetails;
