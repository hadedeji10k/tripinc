import React, { useState } from "react";
import "./AccountPage.css";
import { userData } from "../../../currentUserData";
import AccountPageModal from "../Modal/AccountPageModal/AccountPageModal";

const AccountPage = () => {
  const [showAccountPageModal, setShowAccountPageModal] =
    useState<Boolean>(false);

  const toggleShowAccountModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowAccountPageModal(!showAccountPageModal);
  };

  return (
    <div className="personal_info">
      <div className="profile_details">
        <div className="box">
          <h3 className="header">Account Settings</h3>
          <div className="profile_details_container">
            <div className="profile_details_item">
              <div className="profile_details_item_row">
                <label className="personal_info_label">Preferred Currency</label>
                <input
                  className="personal_info_input"
                  type="text"
                  placeholder={userData?.preferredCurrency}
                  disabled
                />
              </div>
              <div className="profile_details_item_row">
                <label className="personal_info_label">Time Format</label>
                <input
                  className="personal_info_input"
                  type="text"
                  placeholder={userData?.timeFormat}
                  disabled
                />
              </div>
            </div>
            <div className="profile_details_item">
              <div className="profile_details_item_row">
                <label className="personal_info_label">Current Password</label>
                <input
                  className="personal_info_input"
                  type="password"
                  placeholder={userData?.password}
                  disabled
                />
              </div>
              <div className="profile_details_item_row">
                <button
                  className="personal_info_button"
                  onClick={toggleShowAccountModal}
                >
                  Edit Account
                </button>
              </div>
            </div>
          </div>
        </div>

        <AccountPageModal
          showAccountPageModal={showAccountPageModal}
          setShowAccountPageModal={setShowAccountPageModal}
        />

        <div className="box">
          <h3 className="header">Permissions</h3>
          <div className="permission">
            <div className="permission_container">
              <div className="permission_item_container">
                <div>
                  <h4 className="permission_header">Privacy</h4>
                </div>
                <div className="permission_item">
                  <div className="permission_item_content">
                    <p>We use cookies to help personalise content, tailor ads, as well as provide a safer user expereince for you on our platform.</p>
                  </div>
                  <div className="permission_item_content">
                    <button className="personal_info_button">Edit</button>
                  </div>
                </div>
                <div>
                  <h4 className="permission_header">Shares</h4>
                </div>
                <div className="permission_item">
                  <div className="permission_item_content">
                    <p>I give permission for my trip, including my profile name, location and activity check in to be share onto social platforms such as Facebook. </p>
                  </div>
                  <div className="permission_item_content">
                    <button className="personal_info_button">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
