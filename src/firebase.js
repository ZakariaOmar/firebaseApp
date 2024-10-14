// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDs_Pr4JUaidPqnQz_N2zSnC6gohB_AjkE",
  authDomain: "fir-app-83a25.firebaseapp.com",
  projectId: "fir-app-83a25",
  storageBucket: "fir-app-83a25.appspot.com",
  messagingSenderId: "234614234327",
  appId: "1:234614234327:web:d5ecdb2f9a9872f05da492",
  measurementId: "G-D9BS14J49F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app}