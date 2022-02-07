// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHEbSSthUl8jdi8gaD1COZdtGjgLjkJ6Y",
  authDomain: "cart-function-ab0cf.firebaseapp.com",
  projectId: "cart-function-ab0cf",
  storageBucket: "cart-function-ab0cf.appspot.com",
  messagingSenderId: "177433209518",
  appId: "1:177433209518:web:d88b73babd5275ff889b3f",
  measurementId: "G-BL1BC513QZ",
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
