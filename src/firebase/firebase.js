import { initializeApp } from 'firebase/app';
import {
  getAuth, browserLocalPersistence, setPersistence, GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBQqnOwWL56fkOgh4cHVX55Cg0QkNx02-E',
  authDomain: 'turbo-shine.firebaseapp.com',
  projectId: 'turbo-shine',
  storageBucket: 'turbo-shine.appspot.com',
  messagingSenderId: '214912898157',
  appId: '1:214912898157:web:5f872ac1ca66e6dfec1b64',
  measurementId: 'G-CMFTT67QZK',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
isSupported().then(ok => ok && getAnalytics(app));

export { auth, db, googleProvider };
