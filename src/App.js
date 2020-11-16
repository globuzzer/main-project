import React,{useEffect} from "react";
import "./css/App.css";
import { Switch, Route, useLocation, useParams, useRouteMatch } from "react-router-dom";
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
import Package from "./pages/Section/SignUp/Package";
const App = () => {
  const location = useLocation();
  const { pathname } = location;  
  return (
    <>
      {pathname !== "/signup" &&
        pathname !== "/own-city-section" &&
        pathname !== "/travel-blog" &&
        pathname.indexOf("explore") === -1 &&
        pathname != "/cities" && <Navigation />}
       <ScrollToTop />
      <Switch>
        <Route path="/">
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
        <Route path="/travel-blog">
          <TravelBlog />
        </Route>
        <Route exact path="/cities" component={Package} />
      </Switch>
    </>
  );
};

export default App;
