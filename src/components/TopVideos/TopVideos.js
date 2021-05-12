import React, { useState } from "react";
import BlogHeader from "../SectionHeader/BlogHeader";
import KeenSlider from "../Carousel/Carousel";
import { BsCircle } from 'react-icons/bs';
import styles from './styles.module.css';

const TopVideos = ({ city }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

const { videos } = city;
  return (
    <div>
      {videos ? (
        <div>
          <BlogHeader label="Top Videos to see"/>
          <KeenSlider 
            data={videos} 
            currentSlide={currentSlide} 
            setCurrentSlide={setCurrentSlide} 
          />
        </div>
      ) : <div>Loading...</div>}
      <div className={styles.circleBox}>
          <div className={styles.circleItem}>
            {videos.map((item, i) => (
              <div key={item.id} onClick={() => setCurrentSlide(i)}>
              <BsCircle style={{background: i === videos.indexOf(item) ? '#f24b6a' : 'white', borderRadius:'50%', cursor: 'pointer', marginBottom: '20px', marginTop: '30px'}}/>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default TopVideos;
