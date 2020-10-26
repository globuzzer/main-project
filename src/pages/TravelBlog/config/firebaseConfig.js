import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
export const config = {
  apiKey: "AIzaSyCU_38TH3VUWdJiFP95yHB6-UE4oM5mki8",
  authDomain: "glo-buzz-store.firebaseapp.com",
  databaseURL: "https://glo-buzz-store.firebaseio.com",
  projectId: "glo-buzz-store",
  storageBucket: "glo-buzz-store.appspot.com",
  messagingSenderId: "619281006973",
  appId: "1:619281006973:web:c94423d2109d0ba5f0cc14",
  measurementId: "G-DT73GX6DQL",
};

firebase.initializeApp(config);
export const database = firebase.firestore();
