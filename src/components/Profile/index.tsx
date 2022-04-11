import React, { useState } from "react";
// import AccountPage from './AccountPage'
import PersonalInfoPage from "./PersonalInfoPage/PersonalInfoPage";
import AccountPage from "./AccountPage/AccountPage";
import ProfileTopBar from "./ProfileTopBar/ProfileTopBar";
import BankingPage from "./BankingPage/BankingPage";
import BookingsPage from "./BookingsPage/BookingsPage";
import Wallet from "./WalletPage/WalletPage";
import HelpCenterPage from "./HelpCenterPage/HelpCenterPage";

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

  let data = menuBar.filter((item) => item.state === true);

  return (
    <>
      <ProfileTopBar menuBar={menuBar} setMenuBar={setMenuBar} />

      {data[0].slug === "personal_info" ? (
        <PersonalInfoPage />
      ) : data[0].slug === "account" ? (
        <AccountPage />
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
  );
};

export default Profile;
