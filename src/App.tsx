import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoute from "./routings";
import ScrollToTop from "react-scroll-to-top";

import ScrollToTopOfPage from "./pages/scrollToTopOfPage";
import { arrowSVGText, svgStyle } from "./utils/constants";

function App() {
  return (
    <>
      <ScrollToTop
        smooth
        svgPath={arrowSVGText}
        color="white"
        width="500"
        height="500"
        viewBox="2 5 252 246"
        style={svgStyle}
      />
      <Router>
        <ScrollToTopOfPage />
        <MainRoute />
      </Router>
    </>
  );
}

export default App;
