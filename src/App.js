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
import { SignUp } from "./pages/SignUp";
import ScrollToTop from "./utils/ScrollToTop";
import TravelBlog from "./pages/TravelBlog/index";
import Section from "./pages/Section/index";
import Package from "./pages/Section/SignUp/Package";
const App = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname !== "/signup" &&
        pathname !== "/own-city-section" &&
        pathname !== "/travel-blog" &&
        pathname !== "/Helsinki" &&
        pathname != "/cities" && <Navigation />}
      {pathname !== "/Helsinki" && <ScrollToTop />}
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
          <SignUp />
        </Route>
        {/* <Route path="/Helsinki">
          <Helsinki />
        </Route> */}
        <Route path="/travel-blog">
          <TravelBlog />
        </Route>
        <Route path="/Helsinki">
          <Section />
        </Route>
        <Route exact path="/cities" component={Package} />
      </Switch>
    </>
  );
};

export default App;
