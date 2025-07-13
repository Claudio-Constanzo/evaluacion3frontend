import { firebaseConfig } from './Credenciales';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCuio62EKeBCDgMibheAVuVIrzHbxexNBU",
    authDomain: "evaluacion-4-73cae.firebaseapp.com",
    projectId: "evaluacion-4-73cae",
    storageBucket: "evaluacion-4-73cae.firebasestorage.appspot.com",
    messagingSenderId: "693305880675",
    appId: "1:693305880675:web:d88044f0ef51dd838d0856",
    measurementId: "G-RBS54FDZW8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

