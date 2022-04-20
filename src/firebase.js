// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuJUHk1OdN_zsPiLjTVxObRzLXpBaU6MA",
  authDomain: "linkedin-clone-c594a.firebaseapp.com",
  projectId: "linkedin-clone-c594a",
  storageBucket: "linkedin-clone-c594a.appspot.com",
  messagingSenderId: "16593484895",
  appId: "1:16593484895:web:3fce428b762080813a6fea",
  measurementId: "G-SLXKFEXHXJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Get a non-default Storage bucket
const firebaseApp = getApp();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
