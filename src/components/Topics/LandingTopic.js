import React from 'react'
import Attraction from './attraction/Attraction'
import Career from './career/Career'
import Culture from './culture/Culture'
import Education from './education/Education'
import Health from './health/Health'
import Hotels from './hotel/Hotels'

const LandingTopic = ({ topicName, topic, topicId }) => {

  switch (topicName.toLowerCase()) {
    case 'accomodations':
      return <Hotels topic={topic} />

    case 'attractions':
      return <Attraction topic={topic} />

    case 'culture':
      return <Culture topic={topic} />

    case 'career':
      return <Career />

    case 'education':
      return <Education topic={topic} />

    case 'health':
      return <Health topic={topic} topicName={topicName.toLowerCase()} />

    default:
      return;
  }
}

export default LandingTopic
