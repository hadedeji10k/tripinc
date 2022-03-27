import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
// import Signup from '../components/SignUp';
// import Signin from '../components/SignIn';
// import BasicDetails from "../components/BasicDetails/BasicDetails";
// import Preferences from '../components/Preferences'
// import Profile from '../components/Profile'
// import ExplorePage from "../components/Explore/ExplorePage";
// import ExploreDetails from "../components/ExploreDetails/ExploreDetails";
import BucketListPage from "../components/BucketList/BucketListPage";
import Shopping from "../components/Shopping";
import LandingPage from "../components/LandingPage/LandingPage";

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
      {/* <Profile /> */}
      {/* <ExplorePage /> */}
      {/* <ExploreDetails /> */}
      {/* <BucketListPage /> */}
      {/* <Shopping /> */}
      <LandingPage />
      <Footer />
    </>
  );
};

export default Home;
