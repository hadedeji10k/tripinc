import React, { useState } from 'react'
import './PersonalInfoPage.css'
import ProfileModal from '../Modal/ProfileModal/ProfileModal'
import PreferencesModal from '../Modal/PreferencesModal/PreferencesModal'
import { userData } from '../../../currentUserData'

// testing 
import ErrorMessageModal from '../../MessageModal/ErrorMessageModal/ErrorMessageModal'
import SuccessMessageModal from '../../MessageModal/SuccessMessageModal/SuccessMessageModal'

const PersonalInfoPage = () => {
  // const [preferenceData, setPreferenceData] = useState(preferencedata)

  const [showProfileModal, setShowProfileModal] = useState<Boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<Boolean>(false);
  
  // testing
  const [showErrorMessageModal, setShowErrorMessageModal] = useState<Boolean>(false);
  const [showSuccessMessageModal, setShowSuccessMessageModal] = useState<Boolean>(false);


  const toggleShowErrorMessageModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowErrorMessageModal(!showErrorMessageModal);
  }
  const toggleShowSuccessMessageModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowSuccessMessageModal(!showSuccessMessageModal);
  }


  const toggleShowProfileModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  }
  const toggleShowPreferencesModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowPreferencesModal(!showPreferencesModal);
  }

  return (
    <div className="personal_info">
      <div className="profile_details">
        <h3 className="header">Profile</h3>
        <div className="profile_details_container">
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">First Name</label>
                <input className="personal_info_input" type="text" placeholder={userData?.firstName} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Last Name</label>
                <input className="personal_info_input" type="text" placeholder={userData?.lastName} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">Email Address</label>
                <input className="personal_info_input" type="text" placeholder={userData?.email} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Country</label>
                <input className="personal_info_input" type="text" placeholder={userData?.country} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">City</label>
                <input className="personal_info_input" type="text" placeholder={userData?.city} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Postal Code</label>
                <input className="personal_info_input" type="text" placeholder={userData?.postalCode} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">Phone Number</label>
                <input className="personal_info_input" type="text" placeholder={userData?.phone} disabled/>
            </div>
            <div className="profile_details_item_row">
              <button className="personal_info_button" onClick={toggleShowSuccessMessageModal} >Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h3 className="header">Preferences</h3>
      <div className="preferences_tab">
        <label className="preferences_label">Where you have been to before:</label>
        <div className="preferences_tag_container">
          {userData?.placesBeenToData.map((item, index) => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span key={index} className="places_been_to">{item}</span>
          ))}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your bucket list(s):</label>
        <div className="preferences_tag_container">
          {userData?.bucketList.map((item, index) => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span key={index} className="places_been_to">{item}</span>
          ))}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your travel interests:</label>
        <div className="preferences_tag_container">
          {userData?.preferenceData.map((item, index) => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span key={index} className="preferences_clicked">{item}</span>
          ))}
        </div>
      </div>
      <br />
      <div>
      <button className="preferences_button" onClick={toggleShowPreferencesModal} >Edit Preferences</button>
      </div>
      <ProfileModal showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal} />
      <PreferencesModal showPreferencesModal={showPreferencesModal} setShowPreferencesModal={setShowPreferencesModal} />

      {/* testing */}
      <ErrorMessageModal showErrorMessageModal={showErrorMessageModal} setShowErrorMessageModal={setShowErrorMessageModal} />
      <SuccessMessageModal showSuccessMessageModal={showSuccessMessageModal} setShowSuccessMessageModal={setShowSuccessMessageModal} />
    </div>
  )
}

export default PersonalInfoPage