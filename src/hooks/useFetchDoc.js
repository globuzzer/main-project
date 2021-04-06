import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils";

const useFetchDoc = (document) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState({});

  useEffect(() => {
    const getData = async () => {
      const doc = await firestore
        .collection('landing_live')
        .doc(document)
        .get();
      if (!doc.exists) {
        setLoading(true);
      } else {
        setItems(doc.data());
        setLoading(false);
      }
    };
    getData();
  }, [document, setItems]);
  return { items, loading };
};

export default useFetchDoc;
