import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import AuthVerify from "./AuthVerify";
import LoggedInBanner from "./LoggedInBanner";

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("I'm here ");
  });

  return (
    <>
      <AuthVerify>
        <LoggedInBanner />
        <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />

        <Outlet />
        <Footer />
      </AuthVerify>
    </>
  );
};

export default MainLayout;
