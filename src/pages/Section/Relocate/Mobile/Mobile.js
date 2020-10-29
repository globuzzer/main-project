import React, {useState, useEffect} from 'react';
import styles from './Mobile.module.css';
import {RelocateData} from '../../../../assets/Section/Relocate/RelocateData';
import MobileCard from './MobileCard';

const packagesPerPage = 3;
let arrayHoldingPackages = [];
const Mobile = () => {
  const [packagesToShow, setPackagesToShow]=useState([]);
  const [next, setNext]=useState(3);

  const loopWithSlice = (start, end)=>{
    const slicedPackages = RelocateData.slice(start,end);
    arrayHoldingPackages=[...arrayHoldingPackages, ...slicedPackages];
    setPackagesToShow(arrayHoldingPackages);
  };

  useEffect(()=>{
    loopWithSlice(0, packagesPerPage);
  },[]);

  const showPackagesHandler = ()=>{
    loopWithSlice(next, next + packagesPerPage);
    setNext(next + packagesPerPage);
  };
  return (
    <div className={styles.wrapper}>
      <MobileCard packagesToRender={packagesToShow}/>
      <button className={styles.more} onClick={showPackagesHandler}>View more</button>
    </div>
  );
}

export default Mobile;
