// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuio62EKeBCDgMibheAVuVIrzHbxexNBU",
  authDomain: "evaluacion-4-73cae.firebaseapp.com",
  projectId: "evaluacion-4-73cae",
  storageBucket: "evaluacion-4-73cae.firebasestorage.appspot.com",
  messagingSenderId: "693305880675",
  appId: "1:693305880675:web:d88044f0ef51dd838d0856",
  measurementId: "G-RBS54FDZW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);