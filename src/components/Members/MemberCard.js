import React from "react";
import styles from "./Members.module.css";

export const MemberCard = ({ memberData }) => {
  return (
    <div className={styles.details}>
      <img src={memberData.image} alt="ava" className={styles.ava} />
      <header className={styles.name}>{memberData.name}</header>
      <p className={styles.city}>{memberData.flags}</p>
    </div>
  );
};
