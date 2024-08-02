// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp7IgmfMIeQhCVyujSsK5jdXPynQY1enM",
  authDomain: "bookbridge-3d63b.firebaseapp.com",
  projectId: "bookbridge-3d63b",
  storageBucket: "bookbridge-3d63b.appspot.com",
  messagingSenderId: "1049013615287",
  appId: "1:1049013615287:web:ac640256392a0964b8ab32",
  measurementId: "G-H93Y8XR2KS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };