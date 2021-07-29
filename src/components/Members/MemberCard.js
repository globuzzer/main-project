import React from "react";
import styles from "./Members.module.css";

export const MemberCard = ({ memberData }) => {
  return (
    <div className={styles.memberContainer}>
      <img src={memberData.image} alt="ava" className={styles.ava} />
      <p className={styles.name}>{memberData.name}</p>
      <p className={styles.city}>{memberData.flags}</p>
    </div>
  );
};
