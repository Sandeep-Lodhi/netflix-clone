// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUsoBtVwTEoPF_X4sERgiP1BTHIxC9T1Y",
  authDomain: "netflix-clone-e08d3.firebaseapp.com",
  projectId: "netflix-clone-e08d3",
  storageBucket: "netflix-clone-e08d3.appspot.com",
  messagingSenderId: "89837596861",
  appId: "1:89837596861:web:edf8be056654974c0807d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const database = getFirestore()