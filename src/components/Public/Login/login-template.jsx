import React from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

const LoginTemplate = ({ state }) => {
   const { footer, title, FacebookButton, GithubButton, GoogleButton } = state

   return (
      <React.Fragment>
         <Box mt="20%" mx="auto" width="700px" maxWidth="80%">
            <Paper>
               <Box pt={6} display="flex" justifyContent="center">
                  {title}
               </Box>
               <Box pt={4} display="flex" justifyContent="center">
                  {FacebookButton}
               </Box>
               <Box pt={4} display="flex" justifyContent="center">
                  {GithubButton}
               </Box>
               <Box pt={4} pb={6} display="flex" justifyContent="center">
                  {GoogleButton}
               </Box>
            </Paper>
            <Box mt={2} display="flex" justifyContent="center">
               {footer}
            </Box>
         </Box>
      </React.Fragment>
   )
}

LoginTemplate.propTypes = {
   state: PropTypes.shape({
      title: PropTypes.element.isRequired,
      footer: PropTypes.element.isRequired,
      FacebookButton: PropTypes.element.isRequired,
      GithubButton: PropTypes.element.isRequired,
      GoogleButton: PropTypes.element.isRequired,
   }),
}

export default LoginTemplate
