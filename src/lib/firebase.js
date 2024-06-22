import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBEXv70Bem_amGW6_Rc4rLP2eteWct5meY",
  authDomain: "instagram-5e3aa.firebaseapp.com",
  projectId: "instagram-5e3aa",
  storageBucket: "instagram-5e3aa.appspot.com",
  messagingSenderId: "956207345093",
  appId: "1:956207345093:web:686bdd97d8a493e111afac",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
