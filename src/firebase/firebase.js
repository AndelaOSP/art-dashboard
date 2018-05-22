import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'art-dashboard.firebaseapp.com',
  databaseURL: 'art-dashboard.firebaseio.com',
  projectId: 'art-dashboard',
  storageBucket: 'art-dashboard.appspot.com',
  messagingSenderId: '301823215408',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const googleProvider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export {
  auth,
  googleProvider,
}

