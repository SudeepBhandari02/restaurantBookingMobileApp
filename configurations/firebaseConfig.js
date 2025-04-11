// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDs45JbyRQFP4QUNj9oR8hY34EmkB8E-bw",
    authDomain: "restaurant-booking-67183.firebaseapp.com",
    projectId: "restaurant-booking-67183",
    storageBucket: "restaurant-booking-67183.firebasestorage.app",
    messagingSenderId: "262282679605",
    appId: "1:262282679605:web:a58dd34bb9a0524fb3287c",
    measurementId: "G-VY8BRE1HQ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);