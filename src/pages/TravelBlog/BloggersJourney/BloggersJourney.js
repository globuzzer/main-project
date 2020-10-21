import React from 'react';
import styles from './BloggersJourney.module.css';
import BloggersData from '../../../assets/TravelBlog/BloggersJourney/BloggersData';
import BloggerCard from './BloggerCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {GetWindowDimension} from '../../../utils/GetWindowDimension';
import {SectionHeader} from '../../../components/SectionHeader/SectionHeader';
const BloggersJourney = () => {
 const {width} = GetWindowDimension();

 const BloggersJourneyMobile =()=>{
     const settings ={
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,  
     }
     return (
        <div className={styles.mobile}> 
            <Slider {...settings} className={styles.slider}>
            {BloggersData.map(({img, name, text, url,index})=>(
                <div className={styles.eachSlide} key={index}>
                    <BloggerCard img={img} name={name} text={text} url={url}/>
                </div>
                ))}
            </Slider>
        </div>
     )
 }

 const BloggersJourneyDesk =()=>{
    return (
            <div className={styles.container}>
                {BloggersData.map(({img, name, text, url, index})=>(
                    <BloggerCard img={img} name={name} text={text} url={url} key={index}/>
                ))}
            </div>
    )
 }
    return (
        <div className={styles.wrapper}>
            <SectionHeader header="Bloggers' journey within Globuzzer" className={styles.header}/>
            <p className={styles.description}>Get inspired by people who turned their dreams into reality. Read their stories to find out more about their accomplishments.</p>
            {width >=768 ? <BloggersJourneyDesk/> : <BloggersJourneyMobile/>}
        </div>
    )
}

export default BloggersJourney;
