import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import { BrowserRouter } from "react-router-dom";
import StepContext from "./pages/TravelBlog/GetStarted/StepContext";
import App from "./App";
import Menu from "./pages/TravelBlog/Menu/Menu"

ReactDOM.render(
//   <BrowserRouter>
    <StepContext>
      <Menu />
    </StepContext>,
//     <App />
//   </BrowserRouter>,

  document.getElementById("root")
);
