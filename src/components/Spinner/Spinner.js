import React from 'react';
import spinner from '../../assets/spinner4.gif';
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.box}>
      <div></div>
      <div>
      <img src={spinner} alt="loading"/>
      </div>
      <div></div>
    </div>
  );
};

export default Spinner;