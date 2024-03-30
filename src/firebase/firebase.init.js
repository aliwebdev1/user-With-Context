// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCe7jmz-_7PtZ9lPjCZC8iCyDS_1YlBpxM",
    authDomain: "f23-4authcontext.firebaseapp.com",
    projectId: "f23-4authcontext",
    storageBucket: "f23-4authcontext.appspot.com",
    messagingSenderId: "272396784435",
    appId: "1:272396784435:web:79079dd66b4e678b8ea446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;