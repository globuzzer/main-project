import React from 'react';
import styles from './WhoWeAre.module.css';
import Map from './Map';

const WhoWeAre = () => {
    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <p className={styles.title}>Who we are</p>
                <p className={styles.text}>
                    <span className={styles.paragraph}>Globuzzer is an award winning global <span className={styles.emphasize}>network that</span> was founded in 2006, built by a diverse <span className={styles.emphasize}>community of</span> highly skilled travel enthusiasts.</span>
                    <span className={styles.paragraph}>Our purpose is to connect and <span className={styles.emphasize}>guide millions</span> of users around the world. We host travel websites <span className={styles.emphasize}>and offer</span> the possibility to locals, expats, and travelers to share their experiences.</span>
                    <span className={styles.paragraph}>Trusted by thousands of people every year, <span className={styles.emphasize}>we provide</span> a reliable platform that offers guidance when moving to a new place or going abroad. We have everything from booking <span className={styles.emphasize}>flights to</span> reading informative destination guides and tips.</span>
                </p>
            </div>
            <div className={styles.map}>
            <Map/>  
            </div>
        </div>
        </div>
    );
}

export default WhoWeAre;
