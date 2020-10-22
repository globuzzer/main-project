import React from 'react';
import styles from './WhyGlobuzzer.module.css';
import AdvantageCard from './AdvantageCard';
import WhyData from '../../../assets/TravelBlog/WhyGlobzzuer/WhyData';
import {SectionHeader} from '../../../components/SectionHeader/SectionHeader';

const WhyGobuzzer = () => {
    return (
        <div className={styles.wrapper}>
            <SectionHeader header="Why Globuzzer?" />
            <p className={styles.description}>Because we are a global platform built by a community of worldwide expats, locals, and travelers who seek to share their experiences, discover new topics, and connect with others.</p>
            <hr className={styles.breakLine}/>

            <div className={styles.container}>
                {WhyData.map(({icon,title, text, index})=>(
                    <AdvantageCard key={index} icon={icon} title={title} text={text}/>
                ))}
            </div>
        </div>
    );
}

export default WhyGobuzzer;