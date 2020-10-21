import React from 'react';
import styles from './index.module.css';
import WhoWeAre from './WhoWeAre/WhoWeAre';
const index = () => {
    return (
        <div className={styles.wrapper}>
            <WhoWeAre/>
        </div>
    );
}

export default index;
