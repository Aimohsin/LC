import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyCgyGlYThXDGKYzbWPQ_ksqNBRLwaXk6ek",
    authDomain: "newest-ff351.firebaseapp.com",
    databaseURL: "https://newest-ff351.firebaseio.com",
    projectId: "newest-ff351",
    storageBucket: "newest-ff351.appspot.com",
    messagingSenderId: "29791183459",
    appId: "1:29791183459:web:9e7732a5417721509b4e56",
    measurementId: "G-SEC20WYRRS"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export {
  storage, firebase as default
}