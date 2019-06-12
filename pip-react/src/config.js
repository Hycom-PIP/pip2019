import firebase from 'firebase';

require("firebase/auth");

const config = {
    apiKey: "AIzaSyD0SYD3pGyG0LS54l4jBWFqelq3CI486OU",
    authDomain: "hycom-firebase.firebaseapp.com",
    databaseURL: "https://hycom-firebase.firebaseio.com",
    projectId: "hycom-firebase",
    storageBucket: "hycom-firebase.appspot.com",
    messagingSenderId: "832818815418",
    appId: "1:832818815418:web:747ad5816b3e8a77"
};

const app = firebase.initializeApp(config);
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, facebookProvider, googleProvider}