import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import LoginTemplate from './login-template'

const LoginPage = ({ providers }) => {
   const {
      handleLoginWithFacebook,
      handleLoginWithGithub,
      handleLoginWithGoogle,
   } = providers

   const theme = useTheme()
   const useStyles = makeStyles({
      appBarBrand: {
         color: theme.palette.primary.main,
         fontWeight: '700',
         marginLeft: 'auto',
         marginRight: 'auto',
      },
      appBarBrandSecondary: {
         color: theme.palette.secondary.main,
         fontWeight: '700',
      },
      appBarBrandLite: {
         fontStyle: 'italic',
         fontWeight: '200',
      },
      facebookButton: {
         color: theme.palette.primary.contrastText,
         width: '250px',
         backgroundColor: '#3b5999',
      },
      githubButton: {
         color: theme.palette.primary.contrastText,
         width: '250px',
         backgroundColor: '#24292E',
      },
      googleButton: {
         color: theme.palette.primary.contrastText,
         width: '250px',
         backgroundColor: '#ea4335',
      },
      footer: {
         color: '#24292E',
      },
   })
   const classes = useStyles()

   const title = (
      <Typography className={classes.appBarBrand} variant="h5">
         <span>
            Keeper
            <span className={classes.appBarBrandSecondary}>Rx</span>{' '}
            <span className={classes.appBarBrandLite}>Lite</span>
         </span>
      </Typography>
   )

   const FacebookButton = (
      <Button
         className={classes.facebookButton}
         size="large"
         startIcon={<FontAwesomeIcon icon={['fab', 'facebook']} />}
         variant="contained"
         onClick={handleLoginWithFacebook}
      >
         Login with Facebook
      </Button>
   )

   const GithubButton = (
      <Button
         className={classes.githubButton}
         size="large"
         startIcon={<FontAwesomeIcon icon={['fab', 'github']} />}
         variant="contained"
         onClick={handleLoginWithGithub}
      >
         Login with Github
      </Button>
   )

   const GoogleButton = (
      <Button
         className={classes.googleButton}
         size="large"
         startIcon={<FontAwesomeIcon icon={['fab', 'google']} />}
         variant="contained"
         onClick={handleLoginWithGoogle}
      >
         Login with Google
      </Button>
   )

   const footer = (
      <Typography className={classes.footer} variant="caption">
         34 Fame, LLC - KeeperRx Lite {process.env.REACT_APP_VERSION}
      </Typography>
   )
   const propsLoginTemplate = {
      state: {
         footer,
         title,
         FacebookButton,
         GithubButton,
         GoogleButton,
      },
   }

   return <LoginTemplate {...propsLoginTemplate} />
}

export default LoginPage
