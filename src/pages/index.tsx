import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

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

      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/explore" element={<ExplorePage />}></Route>
        <Route path="/my-trips" element={<MyTrip />}></Route>
        <Route path="/bucket-list" element={<BucketListPage />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/basic-details" element={<BasicDetails />}></Route>
        <Route path="/preferences" element={<Preferences />}></Route>
        <Route path="/profile/add-card" element={<AddCard />}></Route>
        <Route path="/explore-details" element={<ExploreDetails />}></Route>
        <Route path="/plan-trip" element={<PlanTrip />}></Route>
        <Route path="/set-budget" element={<SetBudget />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
        <Route path="/trip-interest" element={<TripInterest />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
