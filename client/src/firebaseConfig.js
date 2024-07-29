import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA51qbZTiMgzP461lVoVBzmYSkdgNjv1ag",
  authDomain: "library-91fb6.firebaseapp.com",
  projectId: "library-91fb6",
  storageBucket: "library-91fb6.appspot.com",
  messagingSenderId: "388844920362",
  appId: "1:388844920362:web:48b4c411bad87f5a6b6d53",
  measurementId: "G-SN2X5P8QVV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
