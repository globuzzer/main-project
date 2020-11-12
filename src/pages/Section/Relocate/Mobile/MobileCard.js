import React from 'react';
import styles from './MobileCard.module.css';

const Mobile = ({packagesToRender, click, number}) => {
    return (
        <>
        {packagesToRender.map((item,index)=>(
          <div className={styles.wrapper} key={index}>
          <div className={styles.left}>
            <img src={item.img} alt="flag" className={styles.flag} />
            <div>
              <p className={styles.price}>{item.price}</p>
            </div>
          </div>
          <div className={styles.right}>
            <p className={styles.title}>{item.title}</p>
            <div className={styles.text}>
              <p>{item.textOne}</p>
              <p>{item.textTwo}</p>
              <p>{item.textThree}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.item}>
                <img src={item.author} alt="author" />
                <p>{item.name}</p>
              </div>
              <div className={styles.item}>
                <img src={item.heart} alt="heart-icon" onClick={click}/>
                <p>{number}</p>
              </div>
              <div className={styles.item}>
                <img src={item.share} alt="share-icon" />
              </div>
            </div>
          </div>
        </div>
        ))}
        </>
    );
}

export default Mobile;
