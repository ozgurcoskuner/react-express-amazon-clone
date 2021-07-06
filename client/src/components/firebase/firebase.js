import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAqvdgboNbLiBvn3OmZacWJIfw-QkfQgpU",
  authDomain: "fir-react-auth-bc715.firebaseapp.com",
  projectId: "fir-react-auth-bc715",
  storageBucket: "fir-react-auth-bc715.appspot.com",
  messagingSenderId: "811935597321",
  appId: "1:811935597321:web:0555ba04d602c06e7089d8",
  measurementId: "G-M02KRYEBC4",
});

export const auth = app.auth();
export default app;
