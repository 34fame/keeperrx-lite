import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@34fame/ui-component-lib'

const LoginTemplate = ({ title, input, actions, message = [] }) => {
   return (
      <React.Fragment>
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
               <Typography variant="caption">34 Fame, LLC</Typography>
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
