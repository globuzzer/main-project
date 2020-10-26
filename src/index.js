import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import StepContext from "./pages/TravelBlog/GetStarted/StepContext";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);
