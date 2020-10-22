import React from 'react';
import styles from './index.module.css';
import WhyGlobuzzer from './WhyGlobuzzer/WhyGlobuzzer';
import WhoWeAre from './WhoWeAre/WhoWeAre';
import BloggersJourney from './BloggersJourney/BloggersJourney';
const index = () => {
    return (
        <div className={styles.wrapper}>
            <WhyGlobuzzer/>
            <WhoWeAre/>
            <BloggersJourney/>
        </div>
    );
}

export default index;
