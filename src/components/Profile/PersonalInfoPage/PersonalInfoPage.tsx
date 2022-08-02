import React, { useState } from "react";
import "./PersonalInfoPage.css";
import ProfileModal from "../Modal/ProfileModal/ProfileModal";
import PreferencesModal from "../Modal/PreferencesModal/PreferencesModal";
import { userData } from "../../../currentUserData";

// testing
// import ErrorMessageModal from "../../MessageModal/ErrorMessageModal/ErrorMessageModal";
// import SuccessMessageModal from "../../MessageModal/SuccessMessageModal/SuccessMessageModal";
import { IUserProfile } from "../../../api/interfaces";

interface PersonalInfoPageProps {
  userProfile: IUserProfile;
  userPreference: any;
  interestData: any;
  setInterestData: any;
  placesVisited: any;
  setPlacesVisited: any;
  wishToVisitPlaces: any;
  setWishToVisitPlaces: any;
}

const PersonalInfoPage = ({
  userProfile,
  userPreference,
  interestData,
  setInterestData,
  placesVisited,
  setPlacesVisited,
  wishToVisitPlaces,
  setWishToVisitPlaces,
}: PersonalInfoPageProps) => {
  // const [preferenceData, setPreferenceData] = useState(preferencedata)
  console.log(interestData);

  const [showProfileModal, setShowProfileModal] = useState<Boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] =
    useState<Boolean>(false);

  // testing
  // const [showErrorMessageModal, setShowErrorMessageModal] =
  //   useState<Boolean>(false);
  // const [showSuccessMessageModal, setShowSuccessMessageModal] =
  //   useState<Boolean>(false);

  // const toggleShowErrorMessageModal = (e: React.FormEvent): void => {
  //   e.preventDefault();
  //   setShowErrorMessageModal(!showErrorMessageModal);
  // };
  // const toggleShowSuccessMessageModal = (e: React.FormEvent): void => {
  //   e.preventDefault();
  //   setShowSuccessMessageModal(!showSuccessMessageModal);
  // };

  const toggleShowProfileModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  };
  const toggleShowPreferencesModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowPreferencesModal(!showPreferencesModal);
  };

  return (
    <div className="personal_info">
      <div className="profile_details">
        <h3 className="header">Profile</h3>
        <div className="profile_details_container">
          <div className="profile_details_item">
            <div className="profile_details_item_row">
              <label className="personal_info_label">First Name</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.firstName}
                disabled
              />
            </div>
            <div className="profile_details_item_row">
              <label className="personal_info_label">Last Name</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.lastName}
                disabled
              />
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
              <label className="personal_info_label">Email Address</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.email}
                disabled
              />
            </div>
            <div className="profile_details_item_row">
              <label className="personal_info_label">Country</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.country}
                disabled
              />
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
              <label className="personal_info_label">City</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.city}
                disabled
              />
            </div>
            <div className="profile_details_item_row">
              <label className="personal_info_label">Postal Code</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.postCode}
                disabled
              />
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
              <label className="personal_info_label">Phone Number</label>
              <input
                className="personal_info_input"
                type="text"
                placeholder={userProfile?.phoneNumber}
                disabled
              />
            </div>
            <div className="profile_details_item_row">
              <button
                className="personal_info_button"
                onClick={toggleShowProfileModal}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h3 className="header">Preferences</h3>
      <div className="preferences_tab">
        <label className="preferences_label">
          Where you have been to before:
        </label>
        <div className="preferences_tag_container">
          {placesVisited.length > 0 ? (
            placesVisited.map((item, index) => (
              // <span key={item.id} className="preferences_tag">{item.title}</span>
              <span key={index} className="places_been_to">
                {item.placeName}
              </span>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              You have no places selected yet
            </p>
          )}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your bucket list(s):</label>
        <div className="preferences_tag_container">
          {wishToVisitPlaces.length > 0 ? (
            wishToVisitPlaces.map((item, index) => (
              // <span key={item.id} className="preferences_tag">{item.title}</span>
              <span key={index} className="places_been_to">
                {item.placeName}
              </span>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              You have no bucket list selected yet
            </p>
          )}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your travel interests:</label>
        <div className="preferences_tag_container">
          {userPreference?.userInterests.length > 0 ? (
            interestData
              ?.filter((item) => item.stateOfClass === true)
              .map((item, index) => (
                // <span key={item.id} className="preferences_tag">{item.title}</span>
                <span key={index} className="preferences_clicked">
                  {item.symbol} {item.title}
                </span>
              ))
          ) : (
            <p style={{ textAlign: "center" }}>
              You have no interest selected yet
            </p>
          )}
        </div>
      </div>
      <br />
      <div>
        <button
          className="preferences_button"
          onClick={toggleShowPreferencesModal}
        >
          Edit Preferences
        </button>
      </div>
      <ProfileModal
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        userProfile={userProfile}
      />
      <PreferencesModal
        showPreferencesModal={showPreferencesModal}
        setShowPreferencesModal={setShowPreferencesModal}
        userPreference={userPreference}
        interestData={interestData}
        setInterestData={setInterestData}
        placesVisited={placesVisited}
        setPlacesVisited={setPlacesVisited}
        wishToVisitPlaces={wishToVisitPlaces}
        setWishToVisitPlaces={setWishToVisitPlaces}
      />

      {/* testing */}
      {/* <ErrorMessageModal showErrorMessageModal={showErrorMessageModal} setShowErrorMessageModal={setShowErrorMessageModal} />
      <SuccessMessageModal showSuccessMessageModal={showSuccessMessageModal} setShowSuccessMessageModal={setShowSuccessMessageModal} /> */}
    </div>
  );
};

export default PersonalInfoPage;
