import React, { useEffect, useState } from 'react'
import Banner from '../../components/Topics/banner/Banner';
import TopicHeader from '../../components/Header/TopicHeader';
import { firestore } from '../../utils/firebase.utils';
import styles from "./index.module.css";
import Article from '../../components/Topics/video_article/video_articles';
import Members from '../../components/Members/Members';
import Hotels from '../../components/Topics/hotel/Hotels';
import OtherTopics from '../../components/Topics/otherTopics/otherTopics';
import { OwnSection } from '../../components/OwnSection/OwnSection';
import { Footer } from '../../components/Footer/Footer';

const CityTopic = ({ props }) => {

  const { topicId, topicName } = props;

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getData()
  }, [topicId])

  const getData = async () => {
    const doc = await firestore.collection('accomodation_live').doc(topicId).get();

    if (!doc.exists) {
      console.log('no data')
    } else {
      setTopics(doc.data())
    }
  }

  return (
    <div>
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
        <Article topicId={topicId} />

        <Members city={topics} />

        <Hotels topic={topics} />

        <OtherTopics topic={topics} />
      </div>

      <div className={styles.footer}>
        <OwnSection />
        <Footer />
      </div>



    </div>
  )
}

export default CityTopic
