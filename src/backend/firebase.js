import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDIARRJi_i9bvKRucvaQB53IM-X9MUk6uw',
  authDomain: 'netflixclone7.firebaseapp.com',
  projectId: 'netflixclone7',
  storageBucket: 'netflixclone7.appspot.com',
  messagingSenderId: '153288246946',
  appId: '1:153288246946:web:0717d00041af02cc5ab9fb',
  measurementId: 'G-326G73EBXE',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
