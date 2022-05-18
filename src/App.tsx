import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import MainRoute from "./routings";

function App() {
  return (
    <Router>
      <MainRoute />
    </Router>
  );
}

export default App;
