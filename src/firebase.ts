// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// Initiate the db
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU_Bzo4KPJXOCDnXZ1mBgzfATtTMRknEA",
  authDomain: "doc-gpt.firebaseapp.com",
  projectId: "doc-gpt",
  storageBucket: "doc-gpt.appspot.com",
  messagingSenderId: "834649857477",
  appId: "1:834649857477:web:e4421322b759741813ffac"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);

// Sign in with Google

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // ...
    })
    .catch((error) => {});
};



export const sendOpenAIRequest = async (messages: any) => {
  let token = await auth.currentUser?.getIdToken();
  console.log(token)

  console.log(JSON.stringify(messages))
  const response = await fetch("https://us-central1-doc-gpt.cloudfunctions.net/gptSearch", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  // const data = response;
  const data = await response.text();
  return data;
}