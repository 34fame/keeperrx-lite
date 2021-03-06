import firebase from './init'

const firestoreDb = firebase.firestore()

const usersRef = firestoreDb.collection('users')
const eventLogsRef = firestoreDb.collection('eventLogs')

const getFirestoreObjects = async props => {
   const { collection, where, orderBy, limit, startAt, endAt } = props
   let ref = null
   let docs = []

   switch (collection) {
      case 'users':
         ref = usersRef
         break
      case 'eventLogs':
         ref = eventLogsRef
         break
      default:
   }

   let query = ref

   if (where) {
      where.map(where => {
         query = query.where(where[0], where[1], where[2])
      })
   }

   if (orderBy) {
      orderBy.map(orderBy => {
         query = query.orderBy(orderBy[0], orderBy[1] ? orderBy[1] : 'asc')
      })
   }

   if (limit) {
      query = query.limit(limit)
   }

   if (startAt) {
      query = query.startAt(startAt)
   }

   if (endAt) {
      query = query.endAt(endAt)
   }

   await query
      .get()
      .then(snapshot => {
         docs = snapshot.docs.map(doc => {
            return {
               id: doc.id,
               ...doc.data(),
            }
         })
      })
      .catch(err => {
         console.error('db', 'getFirestoreObject', 'err', err)
      })

   return docs
}

const saveFirestoreObject = async props => {
   const { collection, document, method = 'set' } = props
   let ref = null
   let saveObject = {
      ...document,
      timestamp: document.timestamp
         ? document.timestamp
         : firebase.firestore.FieldValue.serverTimestamp(),
   }
   switch (collection) {
      case 'users':
         ref = usersRef
         ref = ref.doc(saveObject.uid)
         break
      case 'eventLogs':
         ref = eventLogsRef
         // ref = ref.doc(saveObject.id)
         break
      default:
   }

   switch (method) {
      case 'set':
         ref = ref.set(saveObject)
         break
      case 'add':
         ref = ref.add(saveObject)
         break
      case 'update':
         ref = ref.update(saveObject)
         break
      default:
   }

   await ref
      .then(result => {
         return result
      })
      .catch(err => {
         console.error(
            'firestore.js',
            'saveFirestoreObject',
            'err',
            JSON.stringify(err)
         )
         return err
      })
}

const deleteFirestoreObject = async props => {
   const { collection, id } = props
   let ref = null
   let doc = {}

   switch (collection) {
      case 'users':
         ref = usersRef.doc(id)
         break
      case 'eventLogs':
         ref = eventLogsRef.doc(id)
         break
      default:
   }

   await ref
      .delete()
      .then(() => {
         doc = true
      })
      .catch(err => {
         doc = false
         console.error(
            'firestore.js',
            'deleteFirestoreObject',
            'err',
            JSON.stringify(err)
         )
      })

   return doc
}

export { getFirestoreObjects, saveFirestoreObject, deleteFirestoreObject }
