import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";

const MainLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />

      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
