// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { firebase } from 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase/app";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCUFNHBfaFVjyRK_nt7ZdTDTvmTB-HbDOY",
  authDomain: "meet-897ef.firebaseapp.com",
  projectId: "meet-897ef",
  storageBucket: "meet-897ef.appspot.com",
  messagingSenderId: "789078214163",
  appId: "1:789078214163:web:7c8e26c8e71c41988c61e6",
  measurementId: "G-HFRBMHPN7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export default app;