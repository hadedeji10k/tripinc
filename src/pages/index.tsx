import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import Signup from "../components/SignUp";
import Signin from "../components/SignIn";
import BasicDetails from "../components/BasicDetails/BasicDetails";
import Preferences from "../components/Preferences";
import Profile from "../components/Profile";
import ExplorePage from "../components/Explore/ExplorePage";
import ExploreDetails from "../components/ExploreDetails/ExploreDetails";
import BucketListPage from "../components/BucketList/BucketListPage";
import Shopping from "../components/Shopping";
import LandingPage from "../components/LandingPage/LandingPage";
import PlanTrip from "../components/PlanTrip/PlanTrip";
import SetBudget from "../components/SetBudget/SetBudget";
import TripInterest from "../components/TripInterest/TripInterest";
import MyTrip from "../components/MyTripPage/MyTrip";
import AddCard from "../components/Profile/BankingPage/AddCard/AddCard";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      {/* <Signup /> */}
      {/* <Signin /> */}
      {/* <BasicDetails /> */}
      {/* <Preferences /> */}
      <Profile />
      {/* <AddCard /> */}
      {/* <ExplorePage /> */}
      {/* <ExploreDetails /> */}
      {/* <BucketListPage /> */}
      {/* <PlanTrip /> */}
      {/* <SetBudget /> */}
      {/* <Shopping /> */}
      {/* <TripInterest /> */}
      {/* <MyTrip /> */}
      {/* <LandingPage /> */}
      <Footer />
    </>
  );
};

export default Home;
