import React, { useRef } from "react";
import Header from "./Header/Header";
// import MainBody from "../../components/TravelBlog/body/MainBody";
import HowItWorks from "./HowItWorks/HowItWorks";
import WhyGlobuzzer from "./WhyGlobuzzer/WhyGlobuzzer";
import WhoWeAre from "./WhoWeAre/WhoWeAre";
import BloggersJourney from "./BloggersJourney/BloggersJourney";
import { Footer } from "../../components/Footer/Footer";
import { FooterContext, BloggerContext } from "./contexts/refContext";

function Index() {
  const footerRef = useRef(null);
  const bloggerRef = useRef(null);
  return (
    <div>
      <FooterContext.Provider value={footerRef}>
        <BloggerContext.Provider value={bloggerRef}>
          <Header />
          <HowItWorks />
          <WhyGlobuzzer />
          <WhoWeAre />
          <BloggersJourney />
          <Footer />
        </BloggerContext.Provider>
      </FooterContext.Provider>
    </div>
  );
}

export default Index;
