import React, { Fragment, useEffect, useState } from 'react'
import AmadeusService from '../../../service/amadeus/AmadeusService';
import { sliceData } from '../../../utils/sliceData';
import { ButtonGroup, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Culture.module.css';
import BlogHeader from '../../SectionHeader/BlogHeader';
import Vimeo from '../../Vimeo/Vimeo';

const Culture = ({ topic }) => {
  //states
  const [activities, setActivities] = useState([]);
  const [slicedActivities, setSlicedActivities] = useState([]);
  const [actSize, setActSize] = useState({
    startIndex: 0,
    endIndex: 6
  });
  const [currentPage, setCurrentPage] = useState(0);

  //coordinate
  const [coordinate, setCoordinate] = useState({ lat: '', lng: '' })

  useEffect(() => {
    setCoordinate({ lat: topic.lat, lng: topic.lng })
  }, [topic]);

  useEffect(() => {
    coordinate.lat && AmadeusService
      .searchActivities(coordinate.lat, coordinate.lng)
      .then(res => setActivities(res.data))
      .catch(err => console.error(err))
  }, [coordinate, actSize])

  useEffect(() => {
    const slicedData = activities.length > 0 && sliceData(activities, actSize.startIndex, actSize.endIndex);

    setSlicedActivities(slicedData)
  }, [activities])

  const length = activities.length > 0 && Math.ceil(activities.length / 6)

  const btnList = () => {
    let paginationArr = [];
    for (let index = 0; index < length; index++) {
      paginationArr.push(
        <Button
          key={index} size='lg' variant='secondary'
          onClick={() => {
            changeActivities(index);
            setCurrentPage(index)
          }}
          style={index === currentPage ? { backgroundColor: '#545454' } : {}}
          className={styles.pagBtn}
        >
          {index + 1}
        </Button>
      )
    }
    return paginationArr
  }

  const changeActivities = index => {
    const newSize = ({
      startIndex: index * 6,
      endIndex: index * 6 + 6
    })
    setActSize(newSize)
  }

  return (
    <section>
      <header
        className={styles.cultureHeader}
      >
        <div>
          <BlogHeader label='Find suitable activities' />
        </div>
      </header>

      <div className={styles.cultureFlex} >
        <div className={styles.cultureList}>
          {slicedActivities.length > 0 && slicedActivities.map(activity =>
            <Fragment key={activity.id}>
              <div
                className={styles.cultureItems}
              >
                <div className={styles.cultureLeft}>
                  <img src={activity.pictures} alt={activity.name} />
                  <div>
                    {`${activity.price.amount} ${activity.price.currencyCode}`}
                  </div>
                </div>

                <div className={styles.cultureRight}>
                  <div style={{ position: 'relative' }}>
                    <header>{activity.name}</header>
                  </div>

                  <p>
                    {window.innerWidth > 500 ? sliceData(activity.shortDescription, 0, 201) : sliceData(activity.shortDescription, 0, 50)}
                    <span> ...</span>
                  </p>

                  <button onClick={() => window.open(activity.bookingLink ? activity.bookingLink : '#')}>
                    Explore more
                  </button>
                </div>
              </div>
            </Fragment>
          )}

          <div>
            <ButtonGroup className={styles.btnGroup}>
              {btnList()}
            </ButtonGroup>
          </div>
        </div>

        <div className={styles.vimeo}>
          <Vimeo city={topic} />
        </div>
      </div>
    </section>
  )
}

export default Culture
