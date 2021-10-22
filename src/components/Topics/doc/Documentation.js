import React, { useEffect, useState } from 'react';
import AxiosService from '../../../service/axios/AxiosService';
import { upperCaseFirstLetter } from '../../../utils/upperCaseFirstLetter';
import BlogHeader from '../../SectionHeader/BlogHeader';
import styles from './Document.module.css';
import Map from './Map';

const Documentation = ({ topic }) => {
  //states
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [museums, setMuseums] = useState([]);
  const [churches, setChurches] = useState([]);
  const [cemeteries, setCemeteries] = useState([]);

  const [currentType, setCurrentType] = useState('museum');

  const types = [
    { id: 1, name: 'museum' },
    { id: 2, name: 'church' },
    { id: 3, name: 'cemetery' }
  ]

  // get coordinates of current city
  useEffect(() => {
    setCoordinates({ lat: topic.lat, lng: topic.lng });
  }, [topic])

  //get list of documentation in that city
  useEffect(() => {
    if (coordinates) {
      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'museum')
        .then(res => setMuseums(getGoodData(res.data)))
        .catch(err => console.error(err));

      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'church')
        .then(res => setChurches(getGoodData(res.data)))
        .catch(err => console.error(err));

      AxiosService
        .getPlaces(coordinates.lat, coordinates.lng, 'cemetery')
        .then(res => setCemeteries(getGoodData(res.data)))
        .catch(err => console.error(err));
    }
  }, [coordinates])

  const getGoodData = data => data.filter(d => d.business_status === "OPERATIONAL" && d.photos && d.types.length > 0)

  return (
    <section className={styles.container}>
      <div className={styles.docHeader}>
        <BlogHeader label='Institution to go' />
      </div>

      <div className={styles.btnGroup}>
        {types.map(t =>
          <button
            key={t.id} onClick={() => setCurrentType(t.name)}
            style={t.name.toLowerCase() === currentType ? { color: 'white', backgroundColor: '#F24B6A' } : {}}
          >
            {upperCaseFirstLetter(t.name)}
          </button>)}
      </div>

      <Map
        center={coordinates}
        museums={museums}
        churches={churches}
        cemeteries={cemeteries}
        category={currentType}
      />
    </section>
  )
}

export default Documentation
