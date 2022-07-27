import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoute from "./routings";
import { BackTop } from "antd";
import "antd/dist/antd.min.css";

import ScrollToTopOfPage from "./pages/scrollToTopOfPage";
import { IoMdArrowRoundUp } from "react-icons/io";

function App() {
  return (
    <>
      <BackTop duration={900} style={{ bottom: "30px", right: "30px" }}>
        <div className="back_to_top_app_css">
          <IoMdArrowRoundUp />
        </div>
      </BackTop>
      <Router>
        <ScrollToTopOfPage />
        <MainRoute />
      </Router>
    </>
  );
}

export default App;
