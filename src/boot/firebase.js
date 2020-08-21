import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDLnmTKQPSnjFBobvd3OGRJsIf8WnOCFI0",
  authDomain: "awsome-todo-e2c56.firebaseapp.com",
  databaseURL: "https://awsome-todo-e2c56.firebaseio.com",
  projectId: "awsome-todo-e2c56",
  storageBucket: "awsome-todo-e2c56.appspot.com",
  messagingSenderId: "288495812092",
  appId: "1:288495812092:web:43e3ce911e8d8fea46c679",
  measurementId: "G-TP6B4FZ9DH"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();

export { firebaseAuth };
