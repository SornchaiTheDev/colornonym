// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: "colornonym.firebaseapp.com",
  projectId: "colornonym",
  storageBucket: "colornonym.appspot.com",
  messagingSenderId: "693112118782",
  appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  measurementId: "G-FXS9XK8G72",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
