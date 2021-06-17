// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase";
const firebaseApp=firebase.initializeApp({
    
       //add your firebase api
     
});

const db=firebaseApp.firestore();
export default db;
