import React from 'react';
import Header from './Header/Header';
import NavBar from './Header/NavBar/NavBar';
import Services from './Services/Services'
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
            
        </div>
    );
}

export default index;
