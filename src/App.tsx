import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoute from "./routings";

import ScrollToTop from "./pages/scrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainRoute />
    </Router>
  );
}

export default App;
