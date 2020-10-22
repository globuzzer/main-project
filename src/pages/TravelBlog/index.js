import React from 'react';
import styles from './index.module.css';
import Header from './Header/Header';
import MainBody from '../../components/TravelBlog/body/MainBody';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyGlobuzzer from './WhyGlobuzzer/WhyGlobuzzer';
import WhoWeAre from './WhoWeAre/WhoWeAre';
import BloggersJourney from './BloggersJourney/BloggersJourney';
const index = () => {
    return (
        <div>
            <Header/>
                <HowItWorks/>
                <WhyGlobuzzer/>
                <WhoWeAre/>
                <BloggersJourney/>
        </div>
    );
}

export default index;
