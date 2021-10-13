import React, { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import AxiosService from '../../../service/axios/AxiosService';
import BlogHeader from '../../SectionHeader/BlogHeader';
import Vimeo from '../../Vimeo/Vimeo';
import styles from './Health.module.css';
import MapChart from './MapChart';

const Health = ({ topic, topicName }) => {

  const { items, loading } = useFetch(topicName)

  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [cityName, setCityName] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [cities, setCities] = useState([]);

  // get coordinates of current city
  useEffect(() => {
    setCoordinates({ lat: topic.lat, lng: topic.lng });
    setCityName(topic.city)
  }, [topic])

  // get list of current cities in firebase
  useEffect(() => {
    const newCitiesArr = items.length > 0 && items.map(city => ({
      name: city.city,
      cityCoor: [city.lng, city.lat]
    }))

    setCities(newCitiesArr)
  }, [items])

  // get list of hospitals in the selected city
  useEffect(() => {
    coordinates && AxiosService
      .getHospitals(coordinates.lat, coordinates.lng)
      .then(res => getHospitalInfo(res.data))
  }, [coordinates])

  const getHospitalInfo = hospitalList => {
    const newArr = hospitalList.length > 0 && hospitalList.map(hospital => (
      {
        name: hospital.name,
        address: hospital.vicinity,
        coordinates: [hospital.geometry.location.lng, hospital.geometry.location.lat],
        photos: hospital.photos && hospital.photos[0],

        place: hospital
      })
    )

    setHospitals(newArr)
  }

  return (
    <section className={styles.container}>
      <header className={styles.foodHeader}>
        <div>
          <BlogHeader label='Find suitable places' />
        </div>
      </header>

      <div className={styles.healthFlex}>
        {hospitals.length > 0 &&
          <MapChart
            hospitals={hospitals}
            city={cityName}
            cities={cities}
          />
        }

        <div>
          <Vimeo city={topic} />
        </div>
      </div>
    </section>
  )
}

export default Health
