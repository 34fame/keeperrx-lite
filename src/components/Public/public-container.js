import React from 'react'
import PropTypes from 'prop-types'

import PublicRoutes from './public-routes'

const Public = ({ history }) => {
   const propsPublicRoutes = {
      history: history,
   }

   return <PublicRoutes {...propsPublicRoutes} />
}

PublicRoutes.propTypes = {
   history: PropTypes.object,
}

export default Public
