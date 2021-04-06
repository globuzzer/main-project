import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyAQGOwD9MPOnKz89-APoso1AeWwNoSrhqg",
  authDomain: "admin-project-9c459.firebaseapp.com",
  projectId: "admin-project-9c459",
  storageBucket: "admin-project-9c459.appspot.com",
  messagingSenderId: "509265017455",
  appId: "1:509265017455:web:770b8bb41fdfe3b507ab9a"
});

export const firestore = firebase.firestore();

export default firebase;