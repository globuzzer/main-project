import React from 'react';
import Header from './Header/Header';
import MainBody from '../../components/TravelBlog/body/MainBody';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyGlobuzzer from './WhyGlobuzzer/WhyGlobuzzer';
import WhoWeAre from './WhoWeAre/WhoWeAre';
import BloggersJourney from './BloggersJourney/BloggersJourney';
import {Footer} from '../../components/Footer/Footer';
const index = () => {
    return (
        <div>
            <Header/>
            <HowItWorks/>
                <WhyGlobuzzer/>
                <WhoWeAre/>
                <BloggersJourney/>
            <Footer/>
        </div>
    );
}

export default index;
