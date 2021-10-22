import firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/firebase-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUFYGmD5FmTRPPvT9Q7LneQ2UDXEqZCIw",
  authDomain: "compartilhando-tcc.firebaseapp.com",
  projectId: "compartilhando-tcc",
  databaseURL: 'https://compartilhando-tcc-default-rtdb.firebaseio.com/',
  storageBucket: "compartilhando-tcc.appspot.com",
  messagingSenderId: "368933819799",
  appId: "1:368933819799:web:f687ba4c50cd02fa4ee0d2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, firestore, auth, storage };