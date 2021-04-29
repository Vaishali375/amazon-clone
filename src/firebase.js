import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyXL1XHOcYv5m0BC7AViON_GR5YsK93_0",
    authDomain: "challenge-c4a1c.firebaseapp.com",
    projectId: "challenge-c4a1c",
    storageBucket: "challenge-c4a1c.appspot.com",
    messagingSenderId: "88342657633",
    appId: "1:88342657633:web:cba10301735119ee6a0820",
    measurementId: "G-DN6C0K14YP"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};