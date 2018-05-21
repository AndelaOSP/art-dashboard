import { auth } from './firebase';

// sign in user
export const signInWithEmail = (provider) => {
  return auth.signInWithRedirect(provider);
};
