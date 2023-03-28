import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ContractorViewMore({ open, handleClose, data = [] }) {
  console.log("data", data)
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>More Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jobs
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr no</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Admin Commission</TableCell>
                  <TableCell align="right">Total Wages</TableCell>
                  <TableCell align="right">Total Minutes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.jobs?.length && data.jobs.map((job, index) => (
                  <TableRow
                    key={job.jobId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{`${job.jobName}`}</TableCell>
                    <TableCell align="right">{job?.adminCommision || 0}</TableCell>
                    <TableCell align="right">{job.totalEarnings.toFixed(2)}</TableCell>
                    <TableCell align="right">{job.totalMinutes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}