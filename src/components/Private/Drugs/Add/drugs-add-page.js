import React from 'react'
import PropTypes from 'prop-types'

import DrugsAddTemplate from './drugs-add-template'

const DrugsAdd = ({ actions, state }) => {
   const propsDrugsAddTemplate = { actions, state }

   return <DrugsAddTemplate {...propsDrugsAddTemplate} />
}

DrugsAdd.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.object,
}

export default DrugsAdd
