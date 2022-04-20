import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
