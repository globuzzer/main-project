import React, { Fragment, useEffect, useState } from 'react';
import styles from './Food.module.css';
import logo from '../../../assets/GLOBUZZER.svg';
import AxiosService from '../../../service/axios/AxiosService';
import BlogHeader from '../../SectionHeader/BlogHeader';
import { sliceData } from '../../../utils/sliceData';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Rating } from '@mui/material';
import { VscLoading } from 'react-icons/vsc';
import Vimeo from '../../Vimeo/Vimeo';

const Food = ({ topic }) => {
  //states 
  const [coordinate, setCoordinate] = useState({ lat: '', lng: '' });
  const [restaurants, setRestaurants] = useState([]);
  const [resSize, setResSize] = useState(6);

  useEffect(() => {
    setCoordinate({ lat: topic.lat, lng: topic.lng })
  }, [topic])

  useEffect(() => {
    coordinate.lat && AxiosService
      .getRestaurants(coordinate.lat, coordinate.lng)
      .then(res => {
        const resList = res.data.data;
        const resHasImg = resList && resList.filter(r => r.photo)
        const resHasCuisine = resHasImg && resHasImg.filter(r => r.cuisine.length > 0)
        setRestaurants(resHasCuisine);
      })
      .catch(err => console.error(err));
  }, [coordinate])

  console.log(restaurants);

  //To limit the number of restaurants displayed
  const slicedData = sliceData(restaurants, 0, resSize);

  //more or less
  const moreOrLess = () => {
    let render = 'more';
    if (resSize >= restaurants.length) render = 'less';

    return `Explore ${render}`;
  }

  const moreRes = () => {
    let size = resSize + 6;
    if (resSize >= restaurants.length) size = 6

    return setResSize(size);
  }

  return (
    <section className={styles.container}>
      <header className={styles.foodHeader}>
        <BlogHeader label='Find suitable restaurants' />
      </header>

      <div className={styles.foodFlex}>
        {restaurants.length > 0 ?
          <div className={styles.foodList}>
            {restaurants.length > 0 && slicedData.map(restaurant =>
              <div
                key={restaurant.location_id}
                className={styles.foodItems}
                onClick={() => window.open(restaurant.web_url, '_blank')}
              >
                <div className={styles.foodPicture}>
                  <img src={restaurant.photo && restaurant.photo.images.original.url} alt={restaurant.name} />
                </div>
                <div>
                  <div className={styles.foodInfo}>
                    <div className={styles.basicInfo}>
                      <header>{restaurant.name}</header>
                      <div>
                        <FaMapMarkerAlt color='#5EBFBF' />
                        <span> {restaurant.address}</span>
                        <div>({Math.round(Number(restaurant.distance) * 1000)}m from the center)</div>
                      </div>
                    </div>

                    <div className={styles.rating}>
                      <div>{restaurant.rating}</div>
                      <Rating
                        name='read-only'
                        readOnly
                        precision={0.5}
                        value={Number(restaurant.rating)}
                        color='red'
                      />
                      <div>
                        {restaurant.num_reviews} reviews
                      </div>
                    </div>
                  </div>

                  <div className={styles.cuisine}>
                    {restaurant.cuisine && restaurant.cuisine.map(c =>
                      <span key={c.key}>
                        {c.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          : <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
            <VscLoading style={{ fontSize: 80 }} />
          </div>
        }
        {/* for the ads */}
        <div className={styles.vimeo}>
          <Vimeo city={topic} />
        </div>
      </div>

      {restaurants.length > 0 &&
        <div className={styles.moreRes}>
          <div className={styles.resAds}>
            <div style={{ margin: 30 }}>
              Want to find and explore
              <h3 style={{ marginTop: 15 }}>Different kinds of restaurants?</h3>
            </div>

            <div onClick={() => window.open('https://globuzzer.com/', '_blank')}>
              <img src={logo} alt='globuzzer' className={styles.globuzzerLogo} />
            </div>
          </div>

          <div className={styles.moreOrLess} onClick={moreRes}>
            {moreOrLess()}
          </div>
        </div>
      }
    </section>
  )
}

export default Food
