import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAxWx5V5D9VQ1s_8nDOncOo3yPnWCaGTAk",
    authDomain: "e-shop-85759.firebaseapp.com",
    projectId: "e-shop-85759",
    storageBucket: "e-shop-85759.appspot.com",
    messagingSenderId: "779569412641",
    appId: "1:779569412641:web:365c4f113bb4e0d3c80160",
    measurementId: "G-KWJ74T92RT"
  };

  //initialize firebaes
 firebase.initializeApp(firebaseConfig);

 //initialize firestore
 const projectFirebase = firebase.firestore();

 export { projectFirebase };