import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCmrO9pOcoz8fcIPgOnSHXrFhBnm2ACxt0",
    authDomain: "vorp-2e1d6.firebaseapp.com",
    databaseURL:
        "https://vorp-2e1d6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vorp-2e1d6",
    storageBucket: "vorp-2e1d6.appspot.com",
    messagingSenderId: "808760221946",
    appId: "1:808760221946:web:0632e6ca9dbd28535e6943",
};

export const app = initializeApp(firebaseConfig);
