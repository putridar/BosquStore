import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCJxud0XvcfANrBfbBMg0qjewQhNRWKsNs",
    authDomain: "bt3103-week-6-c4cf6.firebaseapp.com",
    projectId: "bt3103-week-6-c4cf6",
    storageBucket: "bt3103-week-6-c4cf6.appspot.com",
    messagingSenderId: "480161026607",
    appId: "1:480161026607:web:813e4134725d789d7b2cda",
    measurementId: "G-VX5P4E3LVC"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;