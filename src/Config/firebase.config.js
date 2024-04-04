// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqp_OW_JPhMSrfRJcWgV8IKMoJnFfqDv8",
  authDomain: "sdk-bazaar.firebaseapp.com",
  projectId: "sdk-bazaar",
  storageBucket: "sdk-bazaar.appspot.com",
  messagingSenderId: "924399375572",
  appId: "1:924399375572:web:6f905aef92175eefd0d741",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Storage = getStorage(app);

export { Storage };
