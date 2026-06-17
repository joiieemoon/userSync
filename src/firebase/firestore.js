// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPWPqtqnRtUhNprolNNPRfEdfCDq3EAxw",
    authDomain: "usermanagement-e71d1.firebaseapp.com",
    projectId: "usermanagement-e71d1",
    storageBucket: "usermanagement-e71d1.appspot.com",
    messagingSenderId: "300550484941",
    appId: "1:300550484941:web:5d62c150d88c62e7624a84"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;