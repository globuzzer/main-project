import React from 'react';
import Header from './Header/Header';
import NavBar from './Header/NavBar/NavBar';
import styles from './index.module.css';

const index = () => {
    return (
        <div className={styles.section}>
            <NavBar/>
            <div className={styles.header}>
            <Header/>
            </div>
            
        </div>
    );
}

export default index;
