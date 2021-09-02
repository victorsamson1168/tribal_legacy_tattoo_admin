import firebase from 'firebase/app';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDumhtIztG6O8lVcHCerlGbTE94gu_m6mo",
    authDomain: "tribal-legacy-tattoo.firebaseapp.com",
    projectId: "tribal-legacy-tattoo",
    storageBucket: "tribal-legacy-tattoo.appspot.com",
    messagingSenderId: "499502304347",
    appId: "1:499502304347:web:34ff2c179ff8f85466c37e",
    measurementId: "G-MZJWHF4LYC"
  };

  firebase.initializeApp(firebaseConfig);

  console.log(firebase);

  let storage = firebase.storage();
  // console.log(typeof(storage));
  
   export {storage,firebase as default};