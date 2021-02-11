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
import Helsinki from "./pages/Helsinki";
import TravelBlog from "./pages/TravelBlog/Blog/Blog";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {pathname !== "/signup" &&
        pathname !== "/own-city-section" &&
        pathname !== "/blog" && <Navigation />}
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/destination" component={Destination} />
        <Route path="/services" component={Services} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/career" component={Career} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/own-city-section" component={OwnCitySection} />
        <Route path="/signup" component={SignUp} />
        <Route path="/helsinki" component={Helsinki} />
        <Route path="/blog" exact component={TravelBlog} />
      </Switch>
    </div>
  );
};

export default App;
