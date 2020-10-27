import React, { useRef, useState } from "react";
import Header from "./Header/Header";
// import MainBody from "../../components/TravelBlog/body/MainBody";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyGlobuzzer from "./WhyGlobuzzer/WhyGlobuzzer";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import BloggersJourney from "./BloggersJourney/BloggersJourney";
import Card from "./GetStarted/Card";
import { Footer } from "../../components/Footer/Footer";
import { FooterContext, BloggerContext } from "./contexts/refContext";
import { multiStepContext } from "./GetStarted/StepContext";

function Index() {
  const [currentStepNumber, setCurrentStepNumber] = useState(1);
  const [userData, setuserData] = useState([]);
  const [finalData, setfinalData] = useState([]);

  const footerRef = useRef(null);
  const bloggerRef = useRef(null);
  return (
    <div>
      <FooterContext.Provider value={footerRef}>
        <BloggerContext.Provider value={bloggerRef}>
          <multiStepContext.Provider
            value={{
              currentStepNumber,
              setCurrentStepNumber,
              userData,
              setuserData,
              finalData,
              setfinalData,
            }}
          >
            <Header />
            <HowItWorks />
            <WhyGlobuzzer />
            <WhoWeAre />
            <BloggersJourney />
            <Footer />
            <Card />
          </multiStepContext.Provider>
        </BloggerContext.Provider>
      </FooterContext.Provider>
    </div>
  );
}

export default Index;
