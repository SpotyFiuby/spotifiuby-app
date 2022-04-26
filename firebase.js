// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDuRrmRnpkTm6g3HsVCnXKhgZN1y-zZgU",
  authDomain: "spotifiuby-b4cf2.firebaseapp.com",
  projectId: "spotifiuby-b4cf2",
  storageBucket: "spotifiuby-b4cf2.appspot.com",
  messagingSenderId: "899600905229",
  appId: "1:899600905229:web:38c3189b6e2f27b99c1144",
  measurementId: "G-SBDL8SB9BV"
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase