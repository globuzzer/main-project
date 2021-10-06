import React from 'react'
import Career from './career/Career'
import Culture from './culture/Culture'
import Education from './education/Education'
import Hotels from './hotel/Hotels'

const LandingTopic = ({ topicName, topics }) => {
  console.log(topicName)

  switch (topicName.toLowerCase()) {
    case 'accomodations':
      return <Hotels topic={topics} />

    case 'career': 
      return <Career />

    case 'culture': 
      return <Culture />

    case 'education': 
    return <Education />

    default:
      return;
  }
}

export default LandingTopic
