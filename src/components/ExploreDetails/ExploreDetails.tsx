import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import GoogleMapReact from "google-map-react";
import "./ExploreDetails.css";
import { FiFlag } from "react-icons/fi";
import { GoStar } from "react-icons/go";
import { BsSuitHeartFill } from "react-icons/bs";
import image from "../../images/location.png";
import { getExplore } from "../../currentUserData";
import CartModal from "../Cart/CartModal";
import { useParams } from "react-router-dom";
import { getAttractionByID } from "../../api";
import { IDeal, IRatings } from "../../api/interfaces";
import { getUserProfilePicture } from "../../utils/helpers";
import Swal from "sweetalert2";

const ExploreDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCartModal, setShowCartModal] = useState<Boolean>(false);
  const [showDetails, setShowDetails] = useState(false);
  const [attractionData, setAttractionData] = useState<IDeal>();
  const [ratings, setRatings] = useState<IRatings[]>([]);
  const [averageRatings, setAverageRatings] = useState<number>(0);

  const { id } = useParams();

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
          showConfirmButton: false,
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

  // fetch attractiondata from remote or local storage
  useEffect(() => {
    setIsLoading(true);
    getAttractionByID(id).then((res) => {
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
  }, [id]);

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

  const AnyReactComponent = ({ text, lat, lng }) => <div>{text}</div>;

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="explore_details_container">
          <div className="explore_details_image_container">
            <div className="explore_details_image">
              <img
                className="explore_image"
                src={attractionData?.imageUrl}
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
              <div>
                <p>
                  <BsSuitHeartFill className="explore_heart" />
                </p>
              </div>
            </div>
            <div className="inner_container">
              <div className="title_container">
                <h3 className="short_title">
                  {attractionData?.typicalTimeSpent} min
                  {attractionData?.typicalTimeSpent || 0 > 0 ? "s" : ""}
                </h3>
              </div>
            </div>
            <div className="inner_container">
              <div>
                <p>
                  <GoStar /> &nbsp; {averageRatings.toFixed(1)} (
                  {attractionData?.ratings.length} review{""}
                  {attractionData?.ratings.length || 0 > 0 ? "s" : ""})
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
              <div className="description">
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
              </div>
            </div>

            {/* <hr className="line"/> */}

            <div className="explore_container">
              <h3 className="sub_heading">Details</h3>
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
                      // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                      defaultCenter={{
                        lat: attractionData?.latitude,
                        lng: attractionData?.longitude,
                      }}
                      defaultZoom={11}
                    >
                      <AnyReactComponent
                        lat={attractionData?.latitude}
                        lng={attractionData?.longitude}
                        text="My Marker"
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
                {attractionData?.termsAndConditions}
              </p>
            </div>

            <div className="explore_container">
              <h3 className="sub_heading">Cancellation policy</h3>
              <p className="sub_heading_description">
                {attractionData?.cancellationPolicyText}
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
                        alt=""
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
                          {item.rating} star{item.rating > 0 ? "s" : ""}
                        </span>
                      </div>
                      <div className="review_card_details_name">
                        <p className="review_card_details_review">
                          {item.stateOfClass
                            ? item.comment
                            : item.comment.slice(0, 2)}
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
            </div>

            <div className="explore_detail_button_container">
              <button
                className="explore_detail_button"
                onClick={toggleShowCartModal}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <CartModal
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
        />
      </Spin>
    </>
  );
};

export default ExploreDetails;
