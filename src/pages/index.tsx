import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import AuthVerify from "./AuthVerify";
import LoggedInBanner from "./LoggedInBanner";
import {
  localGetCartLength,
  localGetOrdersLength,
  getUserProfilePicture,
  checkAuth,
} from "../utils/helpers";
import { AuthContext } from "../stores/Auth";

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authContext.isLoggedIn);
  const [cartLength, setCartLength] = useState<number>(0);
  const [ordersLength, setOrdersLength] = useState<number>(0);

  const { pathname } = useLocation();

  useEffect(() => {
    console.log("reached here");
    checkAuth() ? setIsLoggedIn(true) : setIsLoggedIn(false);
    localGetCartLength().then((res) => {
      setCartLength(res);
    });
    localGetOrdersLength().then((res) => {
      setOrdersLength(res);
    });
  }, [pathname]);

  useEffect(() => {
    getUserProfilePicture().then((res) => {
      setProfilePicture(res);
    });
  }, [isLoggedIn]);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AuthVerify>
        <LoggedInBanner />
        <Sidebar
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          profilePicture={profilePicture}
          isLoggedIn={isLoggedIn}
          cartLength={cartLength}
          ordersLength={ordersLength}
        />
        <Navbar
          isOpen={isOpen}
          toggleIsOpen={toggleIsOpen}
          profilePicture={profilePicture}
          isLoggedIn={isLoggedIn}
          cartLength={cartLength}
          ordersLength={ordersLength}
        />

        <Outlet />
        <Footer />
      </AuthVerify>
    </>
  );
};

export default MainLayout;
