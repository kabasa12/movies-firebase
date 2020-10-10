import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBEhQgdfh5aNRMuv8Jpq_oNjyOccwaBSiU",
    authDomain: "movie-firebase-subsc.firebaseapp.com",
    databaseURL: "https://movie-firebase-subsc.firebaseio.com",
    projectId: "movie-firebase-subsc",
    storageBucket: "movie-firebase-subsc.appspot.com",
    messagingSenderId: "890857741920",
    appId: "1:890857741920:web:694a31b2b9e58e17b3ed05"
  };
  // Initialize Firebase
  var fireDB = firebase.initializeApp(firebaseConfig);
  export default fireDB.database().ref();
