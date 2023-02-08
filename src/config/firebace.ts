import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5pGVSKMASE_1bvU-EZHlx_jeEPCe_iOE',
  authDomain: 'fine-dust-91dbc.firebaseapp.com',
  projectId: 'fine-dust-91dbc',
  storageBucket: 'fine-dust-91dbc.appspot.com',
  messagingSenderId: '333814781295',
  appId: '1:333814781295:web:f94158757657036c5ec49a',
  measurementId: 'G-FSK8J73GSP',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const signUpWithUser = createUserWithEmailAndPassword;
export const signInWithUser = signInWithEmailAndPassword;
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
