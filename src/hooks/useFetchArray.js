import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils";

const useFetchArray = (document) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docs = await firestore
        .collection('landing_live')
        .doc(document)
        .get();
      if (!docs.exists) {
        setLoading(true);
      } else {
        // setLoading(false);
        // setItems(docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data()
        // })));
        setLoading(false);
        setItems(
          Object.keys(docs.data()).map((key, index) => ({
            id: index,
            ...docs.data()[key]
          }))
        );
      }
    };
    getData();
  }, [document, setItems]);
  return { items, loading };
};

export default useFetchArray;
