// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_MESSAGING_SENDER,
  appId: process.env.VITE_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
