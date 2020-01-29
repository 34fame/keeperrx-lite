import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Home from './Home'

import constants from '../../constants'

const PrivateRoutes = ({ history }) => {
   const { routes } = constants
   const propsHome = { history }

   return (
      <Switch>
         <Route path={routes.home} render={() => <Home {...propsHome} />} />
         <Redirect to={routes.home} />
      </Switch>
   )
}

PrivateRoutes.propTypes = {
   history: PropTypes.object,
}

export default PrivateRoutes
