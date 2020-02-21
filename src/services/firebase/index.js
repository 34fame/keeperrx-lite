import {
   getFirestoreObjects,
   saveFirestoreObject,
   deleteFirestoreObject,
} from './firestore'

import {
   firebaseAuth,
   facebookProvider,
   githubProvider,
   googleProvider,
} from './authentication'

import { analytics } from './analytics'

export {
   analytics,
   firebaseAuth,
   facebookProvider,
   githubProvider,
   googleProvider,
   getFirestoreObjects,
   saveFirestoreObject,
   deleteFirestoreObject,
}
