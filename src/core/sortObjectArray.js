const compareDrugs = (a, b) => {
   const sortField = 'textPrimary'
   const atest = a[sortField].toUpperCase()
   const btest = b[sortField].toUpperCase()

   let comparison = 0
   if (atest < btest) {
      comparison = -1
   } else if (atest > btest) {
      comparison = 1
   }

   return comparison
}

const sortObjectArray = (array, objectType) => {
   if (objectType === 'drugs') {
      array.sort(compareDrugs)
   }
   return array
}

export default sortObjectArray
