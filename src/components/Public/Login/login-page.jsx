import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const LoginPage = ({ providers }) => {
   const {
      handleLoginWithFacebook,
      handleLoginWithGithub,
      handleLoginWithGoogle,
   } = providers

   return (
      <React.Fragment>
         <Grid
            container
            direction="column"
            alignItems="center"
            alignContent="center"
            spacing={4}
         >
            <Grid item>
               <Button
                  color="default"
                  variant="contained"
                  onClick={handleLoginWithFacebook}
               >
                  Login with Facebook
               </Button>
            </Grid>
            <Grid item>
               <Button
                  color="primary"
                  variant="contained"
                  onClick={handleLoginWithGithub}
               >
                  Login with Github
               </Button>
            </Grid>
            <Grid item>
               <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleLoginWithGoogle}
               >
                  Login with Google
               </Button>
            </Grid>
         </Grid>
      </React.Fragment>
   )
}

export default LoginPage
