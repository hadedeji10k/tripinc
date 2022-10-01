import { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./LandingPage.css";
import { Formik } from "formik";

import { newsLetterSchema } from "../../schema/yupSchema";

import image from "../../images/illlustration-travel-agent.png";
import image2 from "../../images/illlustration-bookings-oneplatform.png";
import image3 from "../../images/illlustration-itenary-lifestyle.png";
import phoneImage from "../../images/mockup-phones.png";
import { BiSearch } from "react-icons/bi";

import { getAllCategories, getTopDeals } from "../../api";
import { symbolHelper } from "../../utils/helpers";
import { IFormattedCategory, IDeal } from "../../api/interfaces";
import { signUpToNewsLetter } from "../../api/responseHandlers";
import { Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import { GOOGLEAPIKEY } from "../../utils/constants";

const LandingPage = () => {
  // state to manage location data (to sort out clicked and unclicked location)
  const [categoryData, setCategoryData] = useState<IFormattedCategory[]>();
  const [topDeals, setTopDeals] = useState<IDeal[]>();

  // state for loading of newsletter
  const [isNewsLetterLoading, setIsNewsLetterLoading] =
    useState<boolean>(false);

  const [city, setCity] = useState("");

  useEffect(() => {
    getTopDeals().then((res) => {
      setTopDeals(res.data);
    });
    getAllCategories().then((res) => {
      const arrayToPush: any = [];
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        const data = {
          id: element.id,
          title: element.name,
          symbol: symbolHelper(element.name),
          stateOfClass: false,
        };
        arrayToPush.push(data);
      }
      setCategoryData(arrayToPush);
    });
  }, []);

  // useEffect to manage the prev and next buttons, it determines if there are location tags more than the screen width and hide them (the buttons) if there is no location tags more than the screen width
  useEffect(() => {
    let categoryElement = document.getElementById(
      "category_tag_container"
    ) as HTMLElement;
    let prev = document.getElementById("prev") as HTMLElement;
    let next = document.getElementById("next") as HTMLElement;
    setTimeout(() => {
      // console.log(categoryElement.clientWidth, categoryElement.scrollWidth);
      if (
        categoryElement?.clientWidth === categoryElement?.scrollWidth ||
        categoryElement?.clientWidth > categoryElement?.scrollWidth
      ) {
        // hide this for now till fix
        // console.log(prev, next);
        // prev.style.display = "inline-block";
        // next.style.display = "inline-block";
        prev.style.display = "none";
        next.style.display = "none";
      } else {
        prev.style.display = "";
        next.style.display = "";
      }
    }, 1000);
  }, [categoryData]);

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

  const handleCategoryClick = (e: any) => {
    console.log(e);
    // window.location.href = "";
  };

  // function to handle newsletter subscription
  const handleNewsletterSubmit = async (values: any) => {
    setIsNewsLetterLoading(true);
    console.log(values);
    const { email } = values;
    const formData = {
      email,
    };
    await signUpToNewsLetter(formData);
    setIsNewsLetterLoading(false);
  };

  const initialValues = {
    email: "",
  };

  const handleCityInput = () => {
    const url = `/#/explore/city/${city}`;
    window.location.href = url;
  };

  return (
    <>
      <div className="landing_page_container">
        <div className="landing_page_image_container">
          <h1 className="landing_page_image_header">
            Discover all those hidden gems
          </h1>
          <p className="landing_page_image_sub_header">
            Explore and plan your next Trip
          </p>
        </div>
        <div className="bucket_list_page_search_container">
          <div className="bucket_list_page_search_form">
            <Autocomplete
              apiKey={GOOGLEAPIKEY}
              onPlaceSelected={(selected) => {
                setCity(selected?.formatted_address as string);
              }}
              options={{
                fields: ["formatted_address"],
              }}
              placeholder="Search for a city"
              className="bucket_list_page_search_input"
              id="city_input"
            />
            <button
              className="bucket_list_page_search_button"
              onClick={handleCityInput}
            >
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
            One platform, millions of experiences, yet personalised to you
          </p>
          <div className="landing_page_services_row_container">
            <div className="landing_page_services_row">
              <div className="landing_page_svg_container move-Y">
                <img src={image} alt="" className="landing_page_image" />
              </div>
              <div className="text">
                <p>Travel agent in your pocket</p>
              </div>
            </div>
            <div className="landing_page_services_row">
              <div className="landing_page_svg_container move-X">
                <img src={image2} alt="" className="landing_page_image" />
              </div>
              <div className="text">
                <p>All your bookings on one platform</p>
              </div>
            </div>
            <div className="landing_page_services_row">
              <div className="landing_page_svg_container move-Z">
                <img src={image3} alt="" className="landing_page_image" />
              </div>
              <div className="text">
                <p>Itinerary that fits your lifestyle</p>
              </div>
            </div>
          </div>
        </div>

        {/* how it works */}
        <div className="how_container">
          <h3 className="landing_page_header">Find what floats your boat</h3>
          <p className="landing_page_sub_header">
            Explore experiences tailored to your interest!
          </p>
          <div className="how_inner_container">
            <div className="how_inner_container_40">
              <div className="how_card">
                <p className="red_tag">01</p>
                <p className="how_card_header">Set your limits.</p>
                <p className="how_card_sub_heading">
                  Plan your trip by setting your budget and how many people will
                  be joining you.{" "}
                </p>
              </div>
              <div className="how_card">
                <p className="red_tag">02</p>
                <p className="how_card_header">
                  Find interests that float your boat.{" "}
                </p>
                <p className="how_card_sub_heading">
                  Bookmark the adventures you want and skip the expereinces you
                  don’t.{" "}
                </p>
              </div>
              <div className="how_card">
                <p className="red_tag">03</p>
                <p className="how_card_header">
                  Make every minute counts... Optimise your trip and time.{" "}
                </p>
                <p className="how_card_sub_heading">
                  Simplify planning while giving you the flexibility to do what
                  matters most.{" "}
                </p>
              </div>
            </div>
            <div className="how_inner_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="landing_page_image" />
              </div>
            </div>
          </div>
        </div>

        {/* early_birds */}
        <div className="early_birds">
          <div className="early_birds_container">
            <div className="early_birds_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="landing_page_image" />
              </div>
            </div>
            <div className="early_birds_container_40">
              <h3 className="early_birds_header">
                Want to have early access to TripInc? 🎉
              </h3>
              <p className="early_birds_sub_heading">
                Be one of the first to try our BETA site today! Simply enter
                your email address below and we will send the link to your
                inbox.{" "}
              </p>
              <br />
              <a href="/#/sign-up">
                <button className="button">Try Beta</button>
              </a>
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
            {topDeals?.map((item) => (
              <div className="explore_card" key={item.id}>
                <div className="explore_image_container">
                  <Link to={`/explore-details/attraction/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title + "'s image"}
                      className="explore_image"
                    />
                  </Link>
                </div>
                <Link to={`/explore-details/attraction/${item.id}`}>
                  <p className="explore_card_title">{item.title}</p>
                </Link>
                <p className="explore_card_location">{item.city}</p>
              </div>
            ))}
          </div>
          <a href="/#/explore">
            <button className="button">Explore more!</button>
          </a>
        </div>

        {/* find your next stop */}
        <div className="next_stop">
          <h3 className="landing_page_header">How it works</h3>
          <p className="landing_page_sub_header">
            See how Tripinc can help you plan your next Trip!
          </p>
          <div id="category_tag_container" className="category_tag_container">
            {categoryData?.map((item) => (
              // <span key={item.id} className="preferences_tag">{item.title}</span>
              <a href={`/#/explore/category/${item.title}`} key={item.id}>
                <div
                  id={item.id.toString()}
                  className="category_clicked"
                  onClick={handleCategoryClick}
                >
                  <p className="category_symbol">{item.symbol}</p>
                  <p className="category_title">{item.title}</p>
                  {/* <p className="number_of_cat_list">20+</p> */}
                </div>
              </a>
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
                your email address below and we will send the link to your
                inbox.{" "}
              </p>
              <div className="number_tag">
                <span className="number_tag_1">01</span>Get more discounts today
              </div>
              <div className="number_tag">
                <span className="number_tag_2">02</span>Make the most of every
                minute
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={newsLetterSchema}
                onSubmit={(values) => {
                  handleNewsletterSubmit(values);
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  //  signin form

                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="sign_in_form"
                  >
                    <input
                      name="email"
                      id="newsletter-input"
                      type="email"
                      className="landing_page_newsletter_input"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="red_alert">{errors.email}</p>
                    ) : null}

                    <Spin spinning={isNewsLetterLoading}>
                      <button className="button" type="submit">
                        Submit
                      </button>
                    </Spin>
                  </form>

                  // End of signup form
                )}
              </Formik>
            </div>
            <div className="early_birds_container_60">
              <div className="how_image_container">
                <img src={phoneImage} alt="" className="landing_page_image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
