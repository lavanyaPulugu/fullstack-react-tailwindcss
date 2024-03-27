// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstack-react-edcce.firebaseapp.com",
  projectId: "fullstack-react-edcce",
  storageBucket: "fullstack-react-edcce.appspot.com",
  messagingSenderId: "609762667453",
  appId: "1:609762667453:web:12df56616b7cbff26580d4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
