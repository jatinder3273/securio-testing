import firebase from "firebase";
import 'firebase/auth'
const config = {
  apiKey: "AIzaSyBuN1LdlrQ2fXIC3UkCQZN_t7aks5YL0m8",
  authDomain: "securio-development.firebaseapp.com",
  databaseURL: "https://securio-development.firebaseio.com",
  projectId: "securio-development",
  storageBucket: "securio-development.appspot.com",
  messagingSenderId: "852300300273",
  appId: "1:852300300273:web:ebc705a325aa325b3d0e50",
  measurementId: "G-1XXD41PW2F"
};
const app = firebase.initializeApp(config);
const CloudFunctions = app.functions();
const auth = app.auth();
const db = app.firestore();
export { auth, db, CloudFunctions };
