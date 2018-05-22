import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
<<<<<<< HEAD
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
=======
  authDomain: 'art-dashboard.firebaseapp.com',
  databaseURL: 'art-dashboard.firebaseio.com',
  projectId: 'art-dashboard',
  storageBucket: 'art-dashboard.appspot.com',
  messagingSenderId: '301823215408',
>>>>>>> feat(user-login): authenticate users with andela email
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

