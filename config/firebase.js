import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrWC68Kxezc7q9CTvCrcA2EbB9swbQvM0",
  authDomain: "web-chat11.firebaseapp.com",
  projectId: "web-chat11",
  storageBucket: "web-chat11.appspot.com",
  messagingSenderId: "500785606887",
  appId: "1:500785606887:web:dba7aa5fcb1b2f8ace7242",
  measurementId: "G-5FM279MCXL"
};

  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app() ;

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider, db };