import React from "react";
import "./css/App.css";
import { Switch, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Destination } from "./pages/Destination";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Pricing } from "./pages/Pricing";
import { Career } from "./pages/Career";
import { AboutUs } from "./pages/AboutUs";
import OwnCitySection from "./pages/OwnCitySection";
import  SignUpNow  from "./pages/SignUpNow";
import Helsinki from "./pages/Helsinki";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname !== "/signup" && pathname !== "/own-city-section" && (
        <Navigation />
      )}
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/destination">
          <Destination />
        </Route>
        <Route path="/services">
          <Services />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/career">
          <Career />
        </Route>
        <Route path="/about-us">
          <AboutUs />
        </Route>
        <Route path="/own-city-section">
          <OwnCitySection />
        </Route>
        <Route path="/signup">
          <SignUpNow />
        </Route>
        <Route path="/helsinki">
          <Helsinki />
        </Route>
      </Switch>
    </>
  );
};

export default App;
