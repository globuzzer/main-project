import React from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./Members.module.css";
import BlogHeader from "../SectionHeader/BlogHeader";
import { MemberCard } from "./MemberCard";
import { GetWindowDimension } from "../../utils/GetWindowDimension";

const Members = ({ city }) => {
  const { topMembers } = city;
  const { width } = GetWindowDimension();

  const MembersMobile = () => (
    <div>
      <BlogHeader label="Top members to meet" />
      <div className="member_meet_grid">
        {(topMembers || []).slice(0, 2).map((data) => (
          <>
            <div />
            <div className="member_ava_container">
              <img src={data.image} alt="ava" className="member_ava" />
              <p className="member_ava_name">{data.name}</p>
              <p className="member_ava_city">{data.flags}</p>
            </div>
          </>
          ))}
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <FiPlus className="member_join_icon" />
            </div>
            <button type="button" className="flip-card-back">
              <Link to="/signup" className="join_button_anchor">
                Join us
              </Link>
            </button>
          </div>
        </div>
        {(topMembers || []).slice(2, 5).map((data) => (
          <>
            <div className="member_ava_container">
              <img src={data.image} alt="ava" className="member_ava" />
              <p className="member_ava_name">{data.name}</p>
              <p className="member_ava_city">{data.flags}</p>
            </div>
            <div />
          </>
          ))}
      </div>
    </div>
  );

  const MembersDesktop = () => (
    <div className={styles.wrapper}>
      <BlogHeader label="Top members to meet" />
      <div className={styles.grid}>
        <div className={styles.empty}/>
        {(topMembers || []).slice(0, 2).map((memberData) => (
          <MemberCard
            key={memberData.id}
            memberData={memberData}
          />
        ))}
        <div className={styles.flipcard}>
          <div className={styles.flipcardInner}>
            <div className={styles.flipcardFront}>
              <FiPlus className={styles.joinIcon} />
            </div>
            <button type="button" className={styles.flipcardBack}>
              <Link to="/signup" className={styles.joinAnchor}>
                Join us
              </Link>
            </button>
          </div>
        </div>
        {(topMembers || []).slice(2, 5).map((memberData) => (
          <MemberCard
            key={memberData.id}
            memberData={memberData}
          />
        ))}
        <div />
      </div>
    </div>
  );

  return width > 1100 ? MembersDesktop() : MembersMobile();
};

export default Members;
