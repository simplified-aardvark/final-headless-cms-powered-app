// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLisdkiBoz61sZ_SnRSGhRcVbg2AIm73c",
  authDomain: "todo-app-8c2b9.firebaseapp.com",
  projectId: "todo-app-8c2b9",
  storageBucket: "todo-app-8c2b9.appspot.com",
  messagingSenderId: "979348699174",
  appId: "1:979348699174:web:e0e7a48803f601382b0ee7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
