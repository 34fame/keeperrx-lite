import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Home from './Home'
import Logout from './Logout'

import constants from '../../constants'

const PrivateRoutes = ({ history }) => {
   const { routes } = constants

   const propsHome = { history }
   const propsLogout = { history }

   return (
      <Switch>
         <Route
            exact
            path={routes.drugs}
            render={() => <Home {...propsHome} />}
         />
         <Route
            exact
            path={routes.drugs + routes.add}
            render={() => <Home {...propsHome} />}
         />
         <Route
            exact
            path={routes.interactions}
            render={() => <Home {...propsHome} />}
         />
         <Route
            exact
            path={routes.adverseEvents}
            render={() => <Home {...propsHome} />}
         />
         <Route
            exact
            path={routes.eventLogs}
            render={() => <Home {...propsHome} />}
         />
         <Route
            exact
            path={routes.logout}
            render={() => <Logout {...propsLogout} />}
         />
         <Redirect to={routes.drugs} />
      </Switch>
   )
}

PrivateRoutes.propTypes = {
   history: PropTypes.object,
}

export default PrivateRoutes
