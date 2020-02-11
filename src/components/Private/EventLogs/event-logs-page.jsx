import React from 'react'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import EventLogsTemplate from './event-logs-template'

const EventLogsPage = ({ state }) => {
   const { days, eventsByDay, total, handleLoadMore } = state

   const Title = (
      <Typography variant="h5" paragraph>
         Event Logs
      </Typography>
   )

   const LoadMoreButton = (
      <Button color="primary" variant="outlined" onClick={handleLoadMore}>
         Load more events
      </Button>
   )

   const EventList = (
      <Box>
         {days.map((day, idx) => (
            <Box key={idx}>
               <Typography variant="h6" paragraph>
                  {moment(day, moment.ISO_8601).format('MMMM Do, YYYY')}
               </Typography>
               <List>
                  {eventsByDay[day].map(event => (
                     <ListItem
                        key={event.item.id}
                        alignItems="flex-start"
                        button
                        dense
                        divider
                     >
                        <ListItemAvatar>
                           {event.perpetrator.photoURL ? (
                              <Avatar
                                 alt={event.perpetrator.displayName}
                                 src={event.perpetrator.photoURL}
                              />
                           ) : (
                              <Avatar>
                                 <AccountCircleIcon />
                              </Avatar>
                           )}
                        </ListItemAvatar>
                        <ListItemText
                           primary={event.phrase}
                           secondary={moment(event.item.timestamp, 'x').format(
                              'MMMM Do, YYYY h:mm:ssA'
                           )}
                        />
                     </ListItem>
                  ))}
               </List>
            </Box>
         ))}
      </Box>
   )

   const Empty = <Typography variant="body2">No events were found.</Typography>

   const propsEventLogsTemplate = {
      state: {
         EventList: days.length > 0 ? EventList : Empty,
         LoadMoreButton,
         Title,
      },
   }

   return <EventLogsTemplate {...propsEventLogsTemplate} />
}

export default EventLogsPage
