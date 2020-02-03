import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import AddCircle from '@material-ui/icons/AddCircle'
import DeleteForever from '@material-ui/icons/DeleteForever'

import DrugsTemplate from './drugs-template'

import constants from '../../../constants'

const DrugsPage = ({ actions, state }) => {
   const { drugs } = state
   const { handleAddClick, handleDrugsDelete } = actions
   const { baseUrl } = constants.services.aws.s3
   const { images } = constants

   const pageTitle = (
      <Box>
         <Typography variant="h5" paragraph>
            Drug List
         </Typography>
      </Box>
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

   const content = () => {
      if (drugs.length > 0) {
         let drugItems = drugs.map((item, idx) => {
            let avatar = <Avatar>{item.textPrimary.substring(0, 2)}</Avatar>
            if (images[item.rxcui]) {
               avatar = (
                  <Avatar
                     alt={item.textPrimary}
                     src={baseUrl + images[item.rxcui]._120}
                  />
               )
            }
            let drugItem = {
               key: idx,
               avatar: avatar,
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
         return (
            <List>
               {drugItems.map((item, idx) => (
                  <ListItem key={idx} button dense divider>
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
      } else {
         return (
            <Typography variant="body2">
               You have no drugs saved. Click ADD A DRUG to get started.
            </Typography>
         )
      }
   }

   const propsDrugsTemplate = {
      actions,
      content,
      state: {
         ...state,
         addButton,
         pageTitle,
      },
   }

   return <DrugsTemplate {...propsDrugsTemplate} />
}

DrugsPage.propTypes = {
   actions: PropTypes.object,
   state: PropTypes.shape({
      drugs: PropTypes.array,
   }),
}

export default DrugsPage
