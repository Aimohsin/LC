import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyCdioJ9iQ7DoDWc5sZJo54_FIHDKH4Z6F4",
    authDomain: "hfinal-ddd44.firebaseapp.com",
    databaseURL: "https://hfinal-ddd44.firebaseio.com",
    projectId: "hfinal-ddd44",
    storageBucket: "hfinal-ddd44.appspot.com",
    messagingSenderId: "507251778120",
    appId: "1:507251778120:web:bb24728f05022812cd2e7d",
    measurementId: "G-KHBJT1C322"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export {
  storage, firebase as default
}