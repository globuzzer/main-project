import React, { Fragment, useEffect, useState } from 'react'
import { FaHeart, FaShare } from 'react-icons/fa';
import BlogHeader from '../../SectionHeader/BlogHeader'
import Vimeo from '../../Vimeo/Vimeo';
import styles from './Attraction.module.css';

const Attraction = ({ topic }) => {

  const [attractions, setAttractions] = useState([]);
  const [currentAttr, setCurrentAttr] = useState('sea');

  useEffect(() => {
    setAttractions(topic.attractionData)
  }, [topic])

  console.log(attractions);

  return (
    <section>
      <BlogHeader label='Find suitable attractions' />

      <div className={styles.attractionBtn}>
        {attractions && Object.keys(attractions).map(attr =>
          <button
            key={attr}
            onMouseOver={() => setCurrentAttr(attr)}
            style={attr === currentAttr ? { backgroundColor: '#F24B6A', color: 'white' } : {}}
          >
            {attractions[attr].title}
          </button>
        )}
      </div>

      <div className={styles.attractionFlex} >
        <div className={styles.attractionList}>
          {attractions && attractions[currentAttr] && attractions[currentAttr].data.map(attr =>
            <Fragment key={attr.id}>
              <div
                className={styles.attractionItems}
              >
                <div className={styles.attractionLeft}>
                  <img src={attr.img} alt={currentAttr} />
                </div>

                <div className={styles.attractionRight}>
                  <div>
                    <header>{attr.title}</header>

                    <div style={{ display: 'flex' }}>
                      <FaShare className={styles.icon} onClick={() => console.log('share')} />
                      <FaHeart className={styles.icon} onClick={() => console.log('heart')} />
                    </div>
                  </div>

                  <p>{attr.content}</p>

                  <button onClick={() => window.open(attr.link ? attr.link : '#')}>
                    Explore more
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </div>

        <div className={styles.vimeo}>
          <Vimeo city={topic} />
        </div>
      </div>
    </section>
  )
}

export default Attraction
