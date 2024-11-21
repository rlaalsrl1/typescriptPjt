// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //인증관련모듈
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1UrXHIIIOGqQp8P2_-h6sjWXPo5E6mCo",
  authDomain: "daelimx-6a5a3.firebaseapp.com",
  projectId: "daelimx-6a5a3",
  storageBucket: "daelimx-6a5a3.appspot.com",
  messagingSenderId: "1099435838022",
  appId: "1:1099435838022:web:7879fcfc38d62ebc069847",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//1. 인증 Authentication with "app"
export const auth = getAuth(app);
//2. DB firestore with "app"
export const firestore = getFirestore(app);
