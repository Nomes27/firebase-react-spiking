import firebase from "firebase/app";
if (!firebase.apps.length) {
  //to sotp initialisign more than once
  firebase.initializeApp({
    apiKey: "AIzaSyDgu6uybWU-E0ZFACRad1M0K6IqLNRzo3I",
    authDomain: "fir-quiz-b9b86.firebaseapp.com",
    databaseURL: "https://fir-quiz-b9b86.firebaseio.com",
    projectId: "fir-quiz-b9b86",
    storageBucket: "fir-quiz-b9b86.appspot.com",
    messagingSenderId: "611628906809",
    appId: "1:611628906809:web:66b7b4dd15dc4401a450e8",
  });
}
export default firebase;
