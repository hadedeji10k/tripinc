import React, { useState } from "react";
import { preferencedata } from "../../../currentUserData";
import "./TripInterest.css";
// testing
// import BudgetWarningModal from "../MessagePopup/BudgetWarningModal/BudgetWarningModal";
// import EventsOverlapModal from "../MessagePopup/EventsOverlapModal/EventsOverlapModal";
// import TimeConstraintModal from "../MessagePopup/TimeConstraintModal/TimeConstraintModal";
import AddPlaceOfStay from "../../MessagePopup/AddPlaceOfPlace/AddPlaceOfStay";

const TripInterest: React.FC = () => {
  // testing
  const [showAccountPageModal, setShowAccountPageModal] =
    useState<Boolean>(false);
  const [preferenceData, setPreferenceData] = useState(preferencedata);

  const toggleShowAccountModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowAccountPageModal(!showAccountPageModal);
  };

  // function to handle preference click
  const handlePreferencesClick = (e: any) => {
    e.preventDefault();
    // console.log(e.target.id)
    const id = e.target.id;
    const index = preferenceData.findIndex((item) => item.id === parseInt(id));
    preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
    // preferenceData[index].class = preferenceData[index].stateOfClass ? 'clicked' : 'not-clicked'
    setPreferenceData([...preferenceData]);
  };

  // Function to handle save button
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   let preferences = preferenceData.filter(
  //     (item) => item.stateOfClass === true
  //   );

  //   console.log(preferences);
  // };

  return (
    <>
      <div className="trip_interest_container">
        <div className="trip_interest_word">
          <h1 className="trip_interest_header">What floats your boat?</h1>
          <h3 className="trip_interest_title">
            Select the type of interest you would like to experience on this
            trip.
          </h3>
        </div>

        {/* Preferences */}
        <div className="trip_interest_tab">
          <div className="trip_interest_tag_container">
            {preferenceData.map((item) => (
              // <span key={item.id} className="trip_interest_tag">{item.title}</span>
              <span
                key={item.id}
                id={item.id.toString()}
                className={
                  item.stateOfClass
                    ? "trip_interest_clicked"
                    : "trip_interest_not_clicked"
                }
                onClick={handlePreferencesClick}
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="trip_interest_button_container">
          <button
            className="trip_interest_button"
            onClick={toggleShowAccountModal}
          >
            Let's go!
          </button>
        </div>
        <div className="trip_interest_other_text_container">
          <h3>
            Not sure where you want to go? No problem we have some ideas.{" "}
            <a href="/" className="trip_interest_other_text">
              Show me!
            </a>
          </h3>
        </div>
        {/* testing */}
        {/* <EventsOverlapModal
          showReviewModal={showAccountPageModal}
          setShowReviewModal={setShowAccountPageModal}
        /> */}
        <AddPlaceOfStay
          showReviewModal={showAccountPageModal}
          setShowReviewModal={setShowAccountPageModal}
        />
        {/* <TimeConstraintModal
          showReviewModal={showAccountPageModal}
          setShowReviewModal={setShowAccountPageModal}
        /> */}
        {/* <BudgetWarningModal
          showReviewModal={showAccountPageModal}
          setShowReviewModal={setShowAccountPageModal}
        /> */}
      </div>
    </>
  );
};

export default TripInterest;
