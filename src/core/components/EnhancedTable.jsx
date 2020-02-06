import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core/styles'

import {
   EnhancedTableHead,
   EnhancedTableToolbar,
   LoadingPage,
} from '../../core'

import { getSorting, sortStable } from '../../core'

const useStyles = makeStyles(theme => ({
   paper: {
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 750,
   },
   visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
   },
}))

const EnhancedTable = props => {
   console.log('EnhancedTable', 'props', props)
   const { headCells, interactions = [], loading, noInteractions } = props
   const classes = useStyles()
   const [order, setOrder] = useState('asc')
   const [orderBy, setOrderBy] = useState('drug1')
   const [page, setPage] = useState(0)
   const [dense] = useState(false)
   const [rowsPerPage, setRowsPerPage] = useState(5)

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
   }

   const handleChangePage = (event, newPage) => {
      setPage(newPage)
   }

   const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
   }

   if (loading) {
      const propsLoadingPage = {
         open: loading,
         message: 'Querying the National Library of Medicine...',
      }
      return <LoadingPage {...propsLoadingPage} />
   }

   if (interactions.length === 0) {
      return noInteractions
   }

   const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, interactions.length - page * rowsPerPage)

   const propsEnhancedTableHead = {
      headCells,
      classes,
      order,
      orderBy,
      onRequestSort: handleRequestSort,
      rowCount: interactions.length,
   }

   const propsEnhancedTableToolbar = {}

   return (
      <Container maxWidth="xl">
         <Paper className={classes.paper}>
            <Box px={2}>
               <EnhancedTableToolbar {...propsEnhancedTableToolbar} />
               <TableContainer>
                  <Table
                     className={classes.table}
                     aria-labelledby="tableTitle"
                     size={dense ? 'small' : 'medium'}
                     aria-label="enhanced table"
                  >
                     <EnhancedTableHead {...propsEnhancedTableHead} />
                     <TableBody>
                        {sortStable(interactions, getSorting(order, orderBy))
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((interaction, idx) => {
                              let tableRow = (
                                 <TableRow hover key={idx}>
                                    <TableCell
                                       component="th"
                                       scope="row"
                                       padding="none"
                                    >
                                       {interaction.source}
                                    </TableCell>
                                    <TableCell>{interaction.drug1}</TableCell>
                                    <TableCell>{interaction.drug2}</TableCell>
                                    <TableCell>
                                       {interaction.severity}
                                    </TableCell>
                                    <TableCell>
                                       {interaction.description}
                                    </TableCell>
                                 </TableRow>
                              )
                              return tableRow
                           })}
                        {emptyRows > 0 && (
                           <TableRow
                              style={{
                                 height: (dense ? 33 : 53) * emptyRows,
                              }}
                           >
                              <TableCell colSpan={6} />
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={interactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
               />
            </Box>
         </Paper>
      </Container>
   )
}

export default EnhancedTable
