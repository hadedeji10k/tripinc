import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { categorydata } from "../../currentUserData";
import image from "../../images/illlustration-travel-agent.png";
import image2 from "../../images/illlustration-bookings-oneplatform.png";
import image3 from "../../images/illlustration-itenary-lifestyle.png";
import phoneImage from "../../images/mockup-phones.png";
import landingPage from "../../images/landing_page.png";
import { BiSearch } from "react-icons/bi";

// dummy images
import exploreImage from "../../images/img container (style).png";
import exploreImage2 from "../../images/img container (style)(1).png";
import exploreImage3 from "../../images/img container (style)(2).png";
import { refreshToken } from "../../api";
import { refreshAccessToken, remoteGetUser } from "../../utils/helpers";

const LandingPage = () => {
  // state to manage location data (to sort out clicked and unclicked location)
  const [categoryData, setCategoryData] = useState(categorydata);

  // useEffect to manage the prev and next buttons, it determines if there are location tags more than the screen width and hide them (the buttons) if there is no location tags more than the screen width
  useEffect(() => {
    let element = document.getElementById(
      "category_tag_container"
    ) as HTMLElement;
    if (
      element.clientWidth === element.scrollWidth ||
      element.clientWidth > element.scrollWidth
    ) {
      let prev = document.getElementById("prev") as HTMLElement;
      let next = document.getElementById("next") as HTMLElement;
      prev.style.display = "none";
      next.style.display = "none";
    }
  }, []);

  // function to handle next button scroll of location if there is overflow in the element's data
  const handleScrollRight = (e: any) => {
    let element = document.getElementById(
      "category_tag_container"
    ) as HTMLElement;
    element.scrollLeft += 70;
  };

  // function to handle prev button scroll of location if there is overflow in the element's data
  const handleScrollLeft = (e: any) => {
    let element = document.getElementById(
      "category_tag_container"
    ) as HTMLElement;
    element.scrollLeft -= 70;
  };

  const handleCategoryClick = (e: any) => {};

  const fetchUser = async () => {
    const user = await remoteGetUser(17);
    console.log(user);
  };

  const refresh = async () => {
    const user = await refreshAccessToken();
    console.log(user);
  };

  return (
    <>
      <div className="landing_page_container">
        <div className="landing_page_image_container">
          {/* <img
            src={landingPage}
            alt="landing_page_image"
            className="landing_page_image"
          /> */}
          <h1 className="landing_page_image_header">
            Discover all those hidden gems
          </h1>
          <p className="landing_page_image_sub_header">
            Explore and plan your next UK Trip
          </p>
        </div>
        <div className="bucket_list_page_search_container">
          <div className="bucket_list_page_search_form">
            <input
              id="input"
              className="bucket_list_page_search_input"
              type="text"
              autoComplete=""
              placeholder="Search for a city"
            />
            <button className="bucket_list_page_search_button">
              <BiSearch />
            </button>
          </div>
        </div>
        {/* services */}
        <div className="landing_page_services">
          <h3 className="landing_page_header">
            Personalised weekend and holiday plans sorted in minutes
          </h3>
          <p className="landing_page_sub_header">
            Imagine one platform, with so many experiences, that helped you make
            the most of your trip!
          </p>
          <div className="landing_page_services_row_container">
            <div className="landing_page_services_row">
              <div className="image_container">
                <img src={image} alt="" className="image" />
              </div>
              <div className="text">
                <p>Travel agent in your pocket</p>
              </div>
            </div>
            <div className="landing_page_services_row">
              <div className="image_container">
                <img src={image2} alt="" className="image" />
              </div>
              <div className="text">
                <p>All your bookings on one platform</p>
              </div>
            </div>
            <div className="landing_page_services_row">
              <div className="image_container">
                <img src={image3} alt="" className="image" />
              </div>
              <div className="text">
                <p>Itenary that fits your lifestyle</p>
              </div>
            </div>
          </div>
        </div>

        {/* how it works */}
        <div className="how_container">
          <h3 className="landing_page_header">How it works</h3>
          <p className="landing_page_sub_header">
            See how Tripinc can help your plan your next UK Trip!
          </p>
          <div className="how_inner_container">
            <div className="how_inner_container_40">
              <div className="how_card">
                <p className="red_tag">01</p>
                <p className="how_card_header">Set your own limits.</p>
                <p className="how_card_sub_heading">
                  Plan your trip by setting your budget and how many people will
                  be joining you.{" "}
                </p>
              </div>
              <div className="how_card">
                <p className="red_tag">02</p>
                <p className="how_card_header">
                  Find interests that floats your boat.{" "}
                </p>
                <p className="how_card_sub_heading">
                  Bucketlist the adventures you want and skip the expereinces
                  you don’t.{" "}
                </p>
              </div>
              <div className="how_card">
                <p className="red_tag">03</p>
                <p className="how_card_header">
                  Build an itenary that looks at the bigger picture.{" "}
                </p>
                <p className="how_card_sub_heading">
                  With so many means to customise your trip you can add and move
                  items whilst seeing real life travel distances between spots.
                  Simplifying planning whilst giving you the flexiblity to
                  explore.{" "}
                </p>
              </div>
            </div>
            <div className="how_inner_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="image" />
              </div>
            </div>
          </div>
        </div>

        {/* early_birds */}
        <div className="early_birds">
          <div className="early_birds_container">
            <div className="early_birds_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="image" />
              </div>
            </div>
            <div className="early_birds_container_40">
              <h3 className="early_birds_header">
                Want to have early access to TripInc? 🎉
              </h3>
              <p className="early_birds_sub_heading">
                Be one of the first to try our BETA site today! Simply enter
                your email address below and we will send you the link to your
                inbox.{" "}
              </p>
              <input
                type="text"
                className="input"
                placeholder="Enter your email address"
              />
              <br />
              <button onClick={fetchUser} className="button">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* explore */}
        <div className="explore">
          <h3 className="landing_page_header">Time to explore!</h3>
          <p className="landing_page_sub_header">
            Top features we want to show you.
          </p>
          <div className="explore_card_container">
            <div className="explore_card">
              <div className="explore_image_container">
                <img src={exploreImage} alt="" className="explore_image" />
              </div>
              <p className="explore_card_title">
                Tommy Live comedy at Tall Horse Pub
              </p>
              <p className="explore_card_location">London, United Kingdom</p>
            </div>
            <div className="explore_card">
              <div className="explore_image_container">
                <img src={exploreImage2} alt="" className="explore_image" />
              </div>
              <p className="explore_card_title">
                Tommy Live comedy at Tall Horse Pub
              </p>
              <p className="explore_card_location">London, United Kingdom</p>
            </div>
            <div className="explore_card">
              <div className="explore_image_container">
                <img src={exploreImage3} alt="" className="explore_image" />
              </div>
              <p className="explore_card_title">
                Tommy Live comedy at Tall Horse Pub
              </p>
              <p className="explore_card_location">London, United Kingdom</p>
            </div>
          </div>
          <button className="button">Explore more!</button>
        </div>

        {/* find your next stop */}
        <div className="next_stop">
          <h3 className="landing_page_header">How it works</h3>
          <p className="landing_page_sub_header">
            See how Tripinc can help your plan your next UK Trip!
          </p>
          <div id="category_tag_container" className="category_tag_container">
            {categoryData.map((item) => (
              // <span key={item.id} className="preferences_tag">{item.title}</span>
              <div
                key={item.id}
                id={item.id.toString()}
                className="category_clicked"
                onClick={handleCategoryClick}
              >
                <p className="category_symbol">{item.symbol}</p>
                <p className="category_title">{item.title}</p>
                <p className="number_of_cat_list">20+</p>
              </div>
            ))}
          </div>

          <div className="scroll_button">
            <span
              id="prev"
              className="scroll_button_tag"
              onClick={handleScrollLeft}
            >
              Prev
            </span>
            <span
              id="next"
              className="scroll_button_tag"
              onClick={handleScrollRight}
            >
              Next
            </span>
          </div>
        </div>

        {/* newsletter */}
        <div className="newsletter">
          <div className="early_birds_container">
            <div className="early_birds_container_40">
              <h3 className="landing_page_header">Join our newsletter 🎉</h3>
              <p className="landing_page_sub_header">
                Be one of the first to try our BETA site today! Simply enter
                your email address below and we will send you the link to your
                inbox.{" "}
              </p>
              <div className="number_tag">
                <span className="number_tag_1">01</span>Get more discounts today
              </div>
              <div className="number_tag">
                <span className="number_tag_2">02</span>Make the most of every
                minute
              </div>
              <input
                type="text"
                className="input"
                placeholder="Enter your email address"
              />
              <br />
              <button className="button" onClick={refresh}>
                Submit
              </button>
            </div>
            <div className="early_birds_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
