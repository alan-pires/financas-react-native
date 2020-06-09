import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
    apiKey: "AIzaSyALGQrYuzbe5HA_k_e9HGskiX7kEht9Chs",
    authDomain: "financas-ee97b.firebaseapp.com",
    databaseURL: "https://financas-ee97b.firebaseio.com",
    projectId: "financas-ee97b",
    storageBucket: "financas-ee97b.appspot.com",
    messagingSenderId: "410850080659",
    appId: "1:410850080659:web:72fde83a2f418233319a66"
  };
  // Initialize Firebase
  if(!firebase.apps.lenght){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;