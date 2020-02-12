const baseUrl = 'https://api.fda.gov'

const getDrugProductLabeling = async rxcui => {
   const url = baseUrl + '/drug/label.json?search=openfda.rxcui.exact:' + rxcui
   const options = {
      method: 'GET',
      redirect: 'follow',
   }

   let resolve = []

   await fetch(url, options)
      .then(response => response.json())
      .then(response => (resolve = response))
      .catch(err => console.error(err))

   return resolve
}

export default getDrugProductLabeling
