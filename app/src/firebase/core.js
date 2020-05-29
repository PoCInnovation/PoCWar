import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAN3COB5bWH1k9SsdX0cRQlNJ-inmYxJEU",
  authDomain: "poc-war.firebaseapp.com",
  databaseURL: "https://poc-war.firebaseio.com",
  projectId: "poc-war",
  storageBucket: "poc-war.appspot.com",
  messagingSenderId: "899918222184",
  appId: "1:899918222184:web:f7af640d76a824a7aefcdd",
  measurementId: "G-N7V8BE95V2",
};

const app = firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();

export { firebaseConfig, app, store };
