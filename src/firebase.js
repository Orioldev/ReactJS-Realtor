// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpLwU1rCZ4QxJDGFJi3-kxY8bTWpObDfA",
  authDomain: "react-clone-realtor.firebaseapp.com",
  projectId: "react-clone-realtor",
  storageBucket: "react-clone-realtor.appspot.com",
  messagingSenderId: "1071177802818",
  appId: "1:1071177802818:web:45653ae02a05f39caa39db"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();