const firebase = require("firebase");
require("firebase/firestore");

// / Initialize Firebase
const config = {
    apiKey: "AIzaSyD687zj9H_SkZNXJdrWPhcyLEdmwDosuH8",
    authDomain: "outforce-app.firebaseapp.com",
    databaseURL: "https://outforce-app.firebaseio.com",
    projectId: "outforce-app",
    storageBucket: "outforce-app.appspot.com",
    messagingSenderId: "198163720867"
};

export const fire = firebase.initializeApp(config);