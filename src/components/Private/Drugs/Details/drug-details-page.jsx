import React from 'react'
import Button from '@material-ui/core/Button'

import DrugDetailsTemplate from './drug-details-template'

const DrugDetailsPage = ({ state }) => {
   const { detail, open, handleClose } = state

   const content = JSON.stringify(detail, null, 3)

   const closeButton = (
      <Button color="primary" onClick={handleClose}>
         Close
      </Button>
   )
   const propsDrugDetailsTemplate = {
      state: {
         content,
         open,
         closeButton,
      },
   }

   return <DrugDetailsTemplate {...propsDrugDetailsTemplate} />
}

export default DrugDetailsPage
