import React, { useEffect, useRef, useState } from 'react'
import Banner from '../../components/Topics/banner/Banner';
import TopicHeader from '../../components/Header/TopicHeader';
import { firestore } from '../../utils/firebase.utils';
import styles from "./index.module.css";
import Article from '../../components/Topics/video_article/video_articles';
import Members from '../../components/Members/Members';
import OtherTopics from '../../components/Topics/otherTopics/otherTopics';
import { OwnSection } from '../../components/OwnSection/OwnSection';
import { Footer } from '../../components/Footer/Footer';
import { articleRefContext, hotelRefContext } from '../../contexts/Refs';
import LandingTopic from '../../components/Topics/LandingTopic';

const CityTopic = ({ props }) => {
  const hotelRef = useRef(null);
  const articleRef = useRef(null);

  const { topicId, topicName } = props;
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getData()
  }, [topicId])

  const getData = async () => {
    const doc = await firestore.collection(topicName.toLowerCase()).doc(topicId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setTopics(doc.data())
    }
  }

  return (
    <div>
      <hotelRefContext.Provider value={hotelRef}>
        <articleRefContext.Provider value={articleRef}>
          <div className={styles.header}>
            <TopicHeader
              topicName={topicName}
              topics={topics}
            />
          </div>

          <div>
            <Banner topics={topics} />
          </div>

          <div className={styles.container}>
            <Article topicName={topicName} topicId={topicId} />

            <Members city={topics} />

            <LandingTopic
              topicName={topicName}
              topic={topics}
              topicId={topicId}
            />

            <OtherTopics topic={topics} />
          </div>
        </articleRefContext.Provider>
      </hotelRefContext.Provider>

      <div className={styles.footer}>
        <OwnSection />
        <Footer />
      </div>
    </div>
  )
}

export default CityTopic
