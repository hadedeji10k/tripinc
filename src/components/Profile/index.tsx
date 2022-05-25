import React, { useState, useContext, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
// import AccountPage from './AccountPage'
import PersonalInfoPage from "./PersonalInfoPage/PersonalInfoPage";
import AccountPage from "./AccountPage/AccountPage";
import ProfileTopBar from "./ProfileTopBar/ProfileTopBar";
import BankingPage from "./BankingPage/BankingPage";
import BookingsPage from "./BookingsPage/BookingsPage";
import Wallet from "./WalletPage/WalletPage";
import HelpCenterPage from "./HelpCenterPage/HelpCenterPage";

import { AuthContext } from "../../stores/Auth";
import {
  checkAuth,
  getFullUserProfile,
  localGetUserId,
} from "../../utils/helpers";
import { getUserPreferences } from "../../api";

const menuBarData = [
  {
    id: 1,
    state: true,
    title: "Personal Info",
    slug: "personal_info",
  },
  {
    id: 2,
    state: false,
    title: "Account",
    slug: "account",
  },
  {
    id: 3,
    state: false,
    title: "Bookings",
    slug: "bookings",
  },
  {
    id: 4,
    state: false,
    title: "Wallet",
    slug: "wallet",
  },
  {
    id: 5,
    state: false,
    title: "Banking",
    slug: "banking",
  },
  {
    id: 6,
    state: false,
    title: "Help Centre",
    slug: "help_centre",
  },
];

const Profile = (): any => {
  const [menuBar, setMenuBar] = useState(menuBarData);
  const [fullUserProfile, setFullUserProfile] = useState<any>(null);
  const [userPreferenceData, setUserPreferenceData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(() => localGetUserId());

  const authContext = useContext(AuthContext);

  useEffect(() => {
    checkAuth() ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getFullUserProfile().then((res) => {
      setFullUserProfile(res);
      // setIsLoading(true);
      getUserPreferences(userId).then((response) => {
        setUserPreferenceData(response.data);
        setIsLoading(false);
      });
    });
  }, [userId]);

  let data = menuBar.filter((item) => item.state === true);

  return (
    <>
      <Spin spinning={isLoading} size="large">
        {/* {!fullUserProfile ? ( */}
        {!isLoggedIn ? (
          <>
            <h3>You must sign in before you can access this page</h3>
          </>
        ) : !fullUserProfile ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Spin spinning={isLoading} size="large"></Spin>
            <br />
            <br />
            <br />
            <br />
            <br />
          </>
        ) : (
          <>
            <ProfileTopBar
              menuBar={menuBar}
              setMenuBar={setMenuBar}
              userProfile={fullUserProfile}
            />
            {data[0].slug === "personal_info" ? (
              <PersonalInfoPage userProfile={fullUserProfile} />
            ) : data[0].slug === "account" ? (
              <AccountPage userPreference={userPreferenceData} />
            ) : data[0].slug === "bookings" ? (
              <BookingsPage />
            ) : data[0].slug === "wallet" ? (
              <Wallet />
            ) : data[0].slug === "banking" ? (
              <BankingPage />
            ) : data[0].slug === "help_centre" ? (
              <HelpCenterPage />
            ) : (
              <></>
            )}
          </>
        )}
      </Spin>
    </>
  );
};

export default Profile;
