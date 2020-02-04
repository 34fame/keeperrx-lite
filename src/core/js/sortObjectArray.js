const compare = sortField => (a, b) => {
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

const sortObjectArray = (array, sortField) => {
   array.sort(compare(sortField))
   return array
}

export default sortObjectArray
