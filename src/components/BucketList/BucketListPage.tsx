/* eslint-disable array-callback-return */
import React, { useState } from "react";
import "./BucketListPage.css";
import { preferencedata, attractiondata } from "../../currentUserData";
import { attraction } from "../../interfaces";
import Card from "../TripCard/Card";

// testing
import ReviewModal from "../ReviewModal/ReviewModal";

import { BiSearch } from "react-icons/bi";

const BucketListPage = () => {
  const [preferenceData, setPreferenceData] = useState(preferencedata);
  const [attractionData, setAttractionData] = useState(attractiondata);
  const [showReviewModal, setShowReviewModal] = useState<Boolean>(false);

  const toggleShowModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowReviewModal(!showReviewModal);
  };

  // function to handle scroll of location
  const handleScrollRight = (e: any) => {
    let element = document.getElementById(
      "preferences_tag_container"
    ) as HTMLElement;
    let elementWidth = element.clientWidth;
    // console.log(elementWidth + 1000);
    element.scrollLeft += 70;
  };
  const handleScrollLeft = (e: any) => {
    let element = document.getElementById(
      "preferences_tag_container"
    ) as HTMLElement;
    let elementWidth = element.clientWidth;
    // console.log(elementWidth + 1000);
    element.scrollLeft -= 70;
  };
  const handlePreferencesClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = preferenceData.findIndex((item) => item.id === parseInt(id));
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData]);
  };

  // attractionData.map((item) => {
  //     item.reviews?.map((item) => {
  //         review += item.rating
  //     })
  // })

  return (
    <>
      <div className="bucket_list_page_container">
        <div className="bucket_list_page_header">
          {/* <img className="bucket_list_page_header_image" src="https://images.unsplash.com/photo-1596889157941-d2651f70a4f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRvdXJpc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="" /> */}
          <div className="bucket_list_page_header_text">
            <h3 className="bucket_list_page_header_title">Bucket List</h3>
            {/* <p className="bucket_list_page_header_description">
              You can search cities you wish on this page using the search form.
            </p> */}
          </div>
        </div>
        <div className="bucket_list_page_search_container">
          <div className="bucket_list_page_search_form">
            <input
              className="bucket_list_page_search_input"
              type="text"
              placeholder="Search for a city"
            />
            <button className="bucket_list_page_search_button">
              <BiSearch />
            </button>
          </div>
        </div>
        <div
          id="preferences_tag_container"
          className="preferences_tag_container"
        >
          <p>Sort using preferences:</p>
          <br />
          {preferenceData.map((item) => (
            // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span
              key={item.id}
              id={item.id.toString()}
              className={
                item.stateOfClass
                  ? "preferences_clicked"
                  : "preferences_not_clicked"
              }
              onClick={handlePreferencesClick}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="scroll_button">
          <span className="preferences_clicked" onClick={handleScrollLeft}>
            Prev
          </span>
          <span className="preferences_clicked" onClick={handleScrollRight}>
            Next
          </span>
        </div>
        {/* Data to be passed here must be from user's bucket list, i.e the item user liked, so it will have the heart red */}
        <Card data={attractionData} />
        <button onClick={toggleShowModal}>Test</button>
      </div>
      <ReviewModal
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
      />
    </>
  );
};

export default BucketListPage;
