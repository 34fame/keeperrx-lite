import React from 'react'
import PropTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const LoginTemplate = ({
   firebase,
   firebaseUIConfig,
   title,
   input,
   actions,
   message = [],
}) => {
   return (
      <React.Fragment>
         <StyledFirebaseAuth
            uiConfig={firebaseUIConfig}
            firebaseAuth={firebase}
         />

         <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
         >
            <Grid item>
               <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={4}
               >
                  <Grid item>{title}</Grid>
                  <Grid item></Grid>
                  <Grid item>{input}</Grid>
                  <Grid item>
                     <Grid container direction="row" wrap="nowrap" spacing={2}>
                        {actions.map((element, idx) => (
                           <Grid key={idx} item>
                              {element}
                           </Grid>
                        ))}
                     </Grid>
                  </Grid>
                  <Grid item>{message}</Grid>
               </Grid>
            </Grid>
            <Grid item>
               <Typography variant="caption">
                  34 Fame, LLC - KeeperRx Lite {process.env.REACT_APP_VERSION}
               </Typography>
            </Grid>
         </Grid>
      </React.Fragment>
   )
}

LoginTemplate.propTypes = {
   title: PropTypes.node.isRequired,
   input: PropTypes.element.isRequired,
   actions: PropTypes.arrayOf(PropTypes.node).isRequired,
   message: PropTypes.node,
}

export default LoginTemplate
