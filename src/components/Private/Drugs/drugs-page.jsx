import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import DrugsTemplate from './drugs-template'
import DrugDetails from './Details'

import constants from '../../../constants'

const DrugsPage = ({ actions, state }) => {
   const { contentToolbarDisplaySetting, drugs, expanded } = state
   const { handleAddClick, handleDrugsDelete } = actions
   const { baseUrl } = constants.services.aws.s3
   const { images } = constants
   const [openDetails, setOpenDetails] = useState(false)
   const [drugDetails, setDrugDetails] = useState('')
   const theme = useTheme()
   const useStyles = makeStyles({
      root: {
         width: 300,
      },
      media: {
         height: 0,
         paddingTop: '56.25%',
      },
      expand: {
         transform: 'rotate(0deg)',
         marginLeft: 'auto',
         transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
         }),
      },
      expandOpen: {
         transform: 'rotate(180deg)',
      },
   })
   const classes = useStyles()

   const pageTitle = (
      <Typography variant="h5" paragraph>
         Drug List
      </Typography>
   )

   const addButton = (
      <Button
         color="primary"
         startIcon={<AddCircle />}
         variant="contained"
         onClick={() => handleAddClick('drugs')}
      >
         Add a drug
      </Button>
   )

   const normalizeDrugItems = () => {
      let drugItems = drugs.map((item, idx) => {
         let avatar = <Avatar>{item.textPrimary.substring(0, 2)}</Avatar>
         let mediaAvatar = '/assets/images/stock-medicines.jpg'
         if (images[item.rxcui]) {
            avatar = (
               <Avatar
                  alt={item.textPrimary}
                  src={baseUrl + images[item.rxcui]._120}
               />
            )
            mediaAvatar = baseUrl + images[item.rxcui]._300
         }
         let drugItem = {
            key: idx,
            rxcui: item.rxcui,
            avatar: avatar,
            mediaAvatar: mediaAvatar,
            textPrimary: item.textPrimary,
            textSecondary: item.textSecondary,
            divider: true,
            secondaryAction: (
               <IconButton
                  color="secondary"
                  onClick={() => handleDrugsDelete(item.rxcui)}
               >
                  <DeleteForever />
               </IconButton>
            ),
         }

         return drugItem
      })
      return drugItems
   }

   const handleListItemClick = rxcui => {
      setDrugDetails(rxcui)
   }

   const contentEmpty = (
      <Container maxWidth="md">
         <Box mt={4}>
            <Paper>
               <Box p={4} display="flex" justifyContent="center">
                  <Typography variant="subtitle1">
                     You have no drugs saved.{' '}
                     <Button
                        color="primary"
                        onClick={() => handleAddClick('drugs')}
                     >
                        Add a drug
                     </Button>
                  </Typography>
               </Box>
            </Paper>
         </Box>
      </Container>
   )

   const contentList = () => {
      let drugItems = normalizeDrugItems()
      return (
         <List>
            {drugItems.map((item, idx) => (
               <ListItem
                  key={idx}
                  button
                  dense
                  divider
                  onClick={() => handleListItemClick(item.rxcui)}
               >
                  {item.avatar && (
                     <ListItemAvatar>
                        <Avatar>{item.avatar}</Avatar>
                     </ListItemAvatar>
                  )}
                  <ListItemText
                     primary={<Typography>{item.textPrimary}</Typography>}
                     secondary={
                        <Typography variant="caption">
                           {item.textSecondary}
                        </Typography>
                     }
                     style={{ paddingRight: '32px' }}
                  />
                  <ListItemSecondaryAction>
                     {item.secondaryAction}
                  </ListItemSecondaryAction>
               </ListItem>
            ))}
         </List>
      )
   }

   const contentCards = () => {
      let drugItems = normalizeDrugItems()
      return (
         <Box
            mx="auto"
            p={2}
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="flex-start"
            alignContent="flex-start"
         >
            {drugItems.map((item, idx) => (
               <Box key={idx} p={2}>
                  <Card className={classes.root}>
                     <CardActionArea
                        onClick={() => handleListItemClick(item.rxcui)}
                     >
                        <CardHeader
                           avatar={item.avatar}
                           title={item.textPrimary}
                           subheader={
                              <Typography variant="caption">
                                 {item.textSecondary}
                              </Typography>
                           }
                        />
                        <CardMedia
                           className={classes.media}
                           // height="140px"
                           image={item.mediaAvatar}
                           title={item.textPrimary}
                        />
                        <CardContent></CardContent>
                     </CardActionArea>
                     <CardActions disableSpacing>
                        {item.secondaryAction}
                     </CardActions>
                     <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent></CardContent>
                     </Collapse>
                  </Card>
               </Box>
            ))}
         </Box>
      )
   }

   const content = () => {
      if (drugs.length === 0) {
         return contentEmpty
      }

      if (contentToolbarDisplaySetting === 'list') {
         return contentList()
      }

      return contentCards()
   }

   const propsDrugsTemplate = {
      actions,
      content: content(),
      state: {
         ...state,
         addButton,
         contentToolbarDisplaySetting,
         pageTitle,
      },
   }

   const propsDrugDetails = {
      state: {
         open: openDetails,
         rxcui: drugDetails,
         setOpen: setOpenDetails,
      },
   }

   return (
      <React.Fragment>
         <DrugsTemplate {...propsDrugsTemplate} />
         <DrugDetails {...propsDrugDetails} />
      </React.Fragment>
   )
}

DrugsPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.shape({
      drugs: PropTypes.array,
   }),
}

export default DrugsPage
