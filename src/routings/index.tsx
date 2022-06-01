import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer/Footer";
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
import ExploreCategoryPage from "../components/ExploreCategory/ExploreCategoryPage";

// import AuthVerify from "../pages/AuthVerify";
import MainLayout from "../pages";
import SocialBasicDetails from "../components/SocialBasicDetails/SocialBasicDetails";
import RequireAuth from "../pages/RequiredAuth";
import VerifyAccount from "../components/VerifyAccount/VerifyAccount";

const MainRoute: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  // const toggleIsOpen = (): void => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {/* <Route element={<AuthVerify />}> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:catName" element={<ExploreCategoryPage />} />
          <Route
            path="/my-trips"
            element={
              <RequireAuth>
                <MyTrip />
              </RequireAuth>
            }
          />
          <Route
            path="/bucket-list"
            element={
              <RequireAuth>
                <BucketListPage />
              </RequireAuth>
            }
          />
          <Route
            path="/verify-account"
            element={
              <RequireAuth>
                <VerifyAccount />
              </RequireAuth>
            }
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/basic-details" element={<BasicDetails />} />
          <Route
            path="/social-basic-details"
            element={<SocialBasicDetails />}
          />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/profile/add-card" element={<AddCard />} />
          <Route path="/explore-details/:id" element={<ExploreDetails />} />
          <Route path="/plan-trip" element={<PlanTrip />} />
          <Route path="/set-budget" element={<SetBudget />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/trip-interest" element={<TripInterest />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default MainRoute;
