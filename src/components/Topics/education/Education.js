import React, { Fragment, useEffect, useState } from 'react';
import { upperCaseFirstLetter } from '../../../utils/upperCaseFirstLetter';
import BlogHeader from '../../SectionHeader/BlogHeader';
import Vimeo from '../../Vimeo/Vimeo';
import styles from './Education.module.css';

const Education = ({ topic }) => {
  //states
  const [schools, setSchools] = useState([]);
  const [current, setCurrent] = useState('university');

  useEffect(() => setSchools(topic.educationData), [topic]);

  console.log(schools)

  return (
    <section className={styles.container}>
      <BlogHeader label='Find suitable universities' />

      <div className={styles.schoolBtn}>
        {schools && Object.keys(schools).map(school =>
          <button
            key={school}
            onMouseOver={() => setCurrent(school)}
            style={school === current ? { backgroundColor: '#F24B6A', color: 'white' } : {}}
          >
            {upperCaseFirstLetter(school.replace('_', ' '))}
          </button>
        )}
      </div>

      <div className={styles.schoolFlex}>
        <div className={styles.schoolList}>
          {schools && schools[current] && schools[current].map(school =>
            <Fragment key={school.id}>
              <div
                className={styles.schoolItems}
                onClick={() => window.open(school.link, '_blank')}
              >
                <div className={styles.schoolImg}>
                  <img src={school.img} alt={current} />
                </div>

                <div className={styles.schoolInfo}>
                  <div>
                    <header>{school.title}</header>
                  </div>
                  <p>{school.content}</p>
                </div>
              </div>
            </Fragment>
          )}
        </div>

        <div>
          <Vimeo city={topic} />
        </div>
      </div>
    </section>
  )
}

export default Education
