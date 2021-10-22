import React from 'react';
import BlogHeader from '../../SectionHeader/BlogHeader';
import styles from './transport.module.css';

const OtherTransport = ({ otherTransports }) => {

  return (
    <div style={{ marginTop: 120 }}>
      <BlogHeader label='Other transportation services' />

      <div className={styles.other}>
        {otherTransports && otherTransports.length > 0 && otherTransports.map(other =>
          <div
            key={other.id}
            onClick={() => window.open(other.link, '_blank')}
          >
            <img src={other.image} alt={other.name} />
            <header>{other.name}</header>
            <p>{other.description}</p>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default OtherTransport
