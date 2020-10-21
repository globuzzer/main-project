import React from 'react';
import styles from './index.module.css';
import BloggersJourney from './BloggersJourney/BloggersJourney';
const index = () => {
    return (
        <div className={styles.wrapper}>
            <BloggersJourney/>
        </div>
    );
}

export default index;
