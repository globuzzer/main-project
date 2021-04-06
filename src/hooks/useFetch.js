import { useEffect, useState } from 'react';
import { firestore } from "../utils/firebase.utils";

const useFetch = (collection) => {
  // const [data, setData] = useState({
  //   error: null,
  //   loading: true,
  //   items: {},
  // });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState({});

  useEffect(() => {
    const unsubscribe = firestore
      .collection(collection)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
            snapshot.docs.map((doc) => (
              setItems({ ...items,
              [doc.id]: doc.data()}
            )),
          );
        },
      );
      return () => unsubscribe();
  }, [collection]);
  return {loading, items};
};

export default useFetch;
