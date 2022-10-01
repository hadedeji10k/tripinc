import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import LoggedInBanner from "./LoggedInBanner";
import {
  localGetCartLength,
  localGetOrdersLength,
  getUserProfilePicture,
  checkAuth,
} from "../utils/helpers";
import { AuthContext } from "../stores/Auth";
import AmbassadorNavbar from "../components/Ambassador/AmbassadorNavbar";
import AmbassadorSidebar from "../components/Ambassador/AmbassadorMobileSidebar";
import AmbassadorSideBar from "../components/Ambassador/AmbassadorSidebar/AmbassadorSideBar";
import styled from "styled-components";

export const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authContext.isLoggedIn);
  const [cartLength, setCartLength] = useState<number>(0);
  const [ordersLength, setOrdersLength] = useState<number>(0);

  const { pathname } = useLocation();

  useEffect(() => {
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
    </>
  );
};

export const AmbassadorLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const authContext = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authContext.isLoggedIn);
  const [cartLength, setCartLength] = useState<number>(0);
  const [ordersLength, setOrdersLength] = useState<number>(0);

  const { pathname } = useLocation();

  useEffect(() => {
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
      <LoggedInBanner />
      <AmbassadorSidebar
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        profilePicture={profilePicture}
        isLoggedIn={isLoggedIn}
        cartLength={cartLength}
        ordersLength={ordersLength}
      />
      <AmbassadorNavbar
        isOpen={isOpen}
        toggleIsOpen={toggleIsOpen}
        profilePicture={profilePicture}
        isLoggedIn={isLoggedIn}
        cartLength={cartLength}
        ordersLength={ordersLength}
      />
      <Div>
        <div className="row w-100 m-auto">
          <DashboardSideBar className="">
            <AmbassadorSideBar />
          </DashboardSideBar>
          <Main className="">
            <Outlet />
          </Main>
        </div>
      </Div>
    </>
  );
};

const DashboardSideBar = styled.div`
  width: 20%;
  height: calc(100vh - 105px);
  background-color: #252748;
  position: fixed;
  left: 1.5%;
  @media (max-width: 801px) {
    display: none;
  }
`;

const Main = styled.div`
  width: 80%;
  position: sticky;
  left: 26.5%;
  padding: 10px;
  padding-left: 15px;
  @media (max-width: 801px) {
    width: 100%;
  }
`;

const Div = styled.div`
  position: relative;
  max-width: 97%;
  display: flex;
  flex-direction: column;
  margin: auto;
`;
