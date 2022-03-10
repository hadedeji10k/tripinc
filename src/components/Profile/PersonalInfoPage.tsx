import React, { useState } from 'react'
import './Profile.css'
import ProfileModal from './Modal/ProfileModal/ProfileModal'
import PreferencesModal from './Modal/PreferencesModal/PreferencesModal'

//  const preferencedata = [
//     {
//       id: 1,
//       title: '🎢 Adventure',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 2,
//       title: '🎨 Arts & Galleries',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 3,
//       title: '🏝 Beach',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 4,
//       title: '🍹 Food & Drinks',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 5,
//       title: '🏝 Shopping',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 6,
//       title: '🏛 History & Culture',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 7,
//       title: '⛩ Iconic Architecture',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 8,
//       title: '⚽️ Sporting Attractions',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 9,
//       title: '🏵 Wellness & Spa',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 10,
//       title: '🌲 Outdoors & Nature',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 11,
//       title: '🎷 Nightlife',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 12,
//       title: '🗽 Tourist Attractions',
//       stateOfClass: false,
//       class: 'clicked'
//     },
//     {
//       id: 13,
//       title: '🎬 Film',
//       stateOfClass: false,
//       class: 'clicked'
//     }
//   ]

const PersonalInfoPage = () => {

  // const [preferenceData, setPreferenceData] = useState(preferencedata)

  const [showProfileModal, setShowProfileModal] = useState<Boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<Boolean>(false);

  const toggleShowProfileModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowProfileModal(!showProfileModal);
  }
  const toggleShowPreferencesModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowPreferencesModal(!showPreferencesModal);
  }

  const userData = {
    firstName: 'Yusuf',
    lastName: 'Adedeji',
    email: 'adedejiyusuf26@gmail.com',
    phone: '+234 906 2047 667',
    country: 'Nigeria',
    postalCode: '600001',
    city: 'Lagos',
    preferenceData: [
      '🎬 Film',
      '🗽 Tourist Attractions',
      '🏵 Wellness & Spa', 
      '🏝 Shopping',
      '🍹 Food & Drinks',
      '🏝 Beach',
      '🎨 Arts & Galleries',
      '🎢 Adventure'
    ],
    placesBeenToData: [
      'Nigeria',
      'Paris',
      'Spain',
      'Italy'
    ],
    bucketList: [
      'Paris',
      'Spain',
      'Italy'
    ]
  }

  return (
    <div className="personal_info">
      <div className="profile_detais">
        <h3 className="header">Profile</h3>
        <div className="profile_details_container">
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">First Name</label>
                <input className="personal_info_input" type="password" placeholder={userData.firstName} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Last Name</label>
                <input className="personal_info_input" type="password" placeholder={userData.lastName} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">Email Address</label>
                <input className="personal_info_input" type="password" placeholder={userData.email} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Country</label>
                <input className="personal_info_input" type="password" placeholder={userData.country} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">City</label>
                <input className="personal_info_input" type="password" placeholder={userData.city} disabled/>
            </div>
            <div className="profile_details_item_row">
                <label className="personal_info_label">Postal Code</label>
                <input className="personal_info_input" type="password" placeholder={userData.postalCode} disabled/>
            </div>
          </div>
          <div className="profile_details_item">
            <div className="profile_details_item_row">
                <label className="personal_info_label">Phone Number</label>
                <input className="personal_info_input" type="password" placeholder={userData.phone} disabled/>
            </div>
            <div className="profile_details_item_row">
              <button className="personal_info_button" onClick={toggleShowProfileModal} >Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      <br />
      <h3 className="header">Preferences</h3>
      <div className="preferences_tab">
        <label className="preferences_label">Where you have been to before:</label>
        <div className="preferences_tag_container">
          {userData.placesBeenToData.map((item, index) => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span key={index} className="places_been_to">{item}</span>
          ))}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your bucket list(s):</label>
        <div className="preferences_tag_container">
          {userData.bucketList.map((item, index) => (
                  // <span key={item.id} className="preferences_tag">{item.title}</span>
            <span key={index} className="places_been_to">{item}</span>
          ))}
        </div>
      </div>

      <div className="preferences_tab">
        <label className="preferences_label">Your travel interests:</label>
        <div className="preferences_tag_container">
          {userData.preferenceData.map((item, index) => (
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
    </div>
  )
}

export default PersonalInfoPage