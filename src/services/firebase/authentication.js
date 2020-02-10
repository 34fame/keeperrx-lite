import firebase from './init'

const facebookProvider = new firebase.auth.FacebookAuthProvider()

const githubProvider = new firebase.auth.GithubAuthProvider()
githubProvider.addScope('repo')

const googleProvider = new firebase.auth.GoogleAuthProvider()

const firebaseAuth = firebase.auth

export { firebaseAuth, facebookProvider, githubProvider, googleProvider }
