import { auth } from './firebase';

// sign in user
export const signInWithEmail = provider => (
  auth.signInWithPopup(provider)
);

export const refreshUserToken = () => {
  auth.onAuthStateChanged((user) => {
    user.getIdToken(true).then((idToken) => {
      localStorage.setItem('art-prod-web-token', idToken);
    });
  });
};
