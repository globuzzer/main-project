import React from 'react';
import Header from './Header/Header';
import NavBar from './Header/NavBar/NavBar';
import Services from './Services/Services'
import Topics from './Topics/Topics';
import Members from './Members/Members';
import Articles from './Articles/Articles';
import Relocate from './Relocate/Relocate';
import styles from './index.module.css';

const index = () => {
    return (
        <div className={styles.section}>
            <NavBar/>
            <div className={styles.header}>
            <Header/>
            </div>
            <div className={styles.services}>
                <Services/>
            </div>
            <div className={styles.topics}>
                <Topics/>
            </div>
            <div className={styles.members}>
                <Members/>
            </div>
            <div className={styles.articles}>
                <Articles/>
            </div>
            <div className={styles.relocate}>
                <Relocate/>
            </div>
        </div>
    );
}

export default index;
