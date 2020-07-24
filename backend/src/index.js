const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
require('firebase/storage');
require('dotenv').config();
const { addRoutes } = require('./routes');

function dbInitialization() {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'poc-war.firebaseapp.com',
    databaseURL: 'https://poc-war.firebaseio.com',
    storageBucket: 'poc-war.appspot.com',
    messagingSenderId: "899918222184",
    appId: process.env.FIREBASE_APP_ID,
    measurementId: "G-N7V8BE95V2"
  });
}

function main() {
  const host = process.env.HOST || 4000;
  const app = express();

  dbInitialization();

  app.use(express.json());
  app.use(cors());
  addRoutes(app);
  app.listen(host, () => {
    console.log(`listening on port ${host}`);
  });
}

main();
