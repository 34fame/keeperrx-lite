import firebase from 'firebase'

firebase.initializeApp({
   apiKey: process.env.REACT_APP_FIREBASE_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
})

const facebookProvider = new firebase.auth.FacebookAuthProvider()
const githubProvider = new firebase.auth.GithubAuthProvider()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const firebaseAuth = firebase.auth

export { firebaseAuth, facebookProvider, githubProvider, googleProvider }