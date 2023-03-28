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
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { THEME } from '../utils/constants';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableBody-root": {
      "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  }
});
export default function ContractorViewMore({ open, handleClose, data = [] }) {
  const classes = useStyles();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: THEME.COLORS.primary,
      color: theme.palette.common.white,
      borderColor: "#333 !important",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderColor: '#333 !important',
      color: theme.palette.common.white
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: THEME.COLORS.backgroundSecondary,
    },
    '&:nth-of-type(even)': {
      backgroundColor: THEME.COLORS.backgroundPrimary,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: THEME.COLORS.backgroundSecondary,
            color: THEME.COLORS.text
          },
        }}
      >
        {/* <DialogTitle>More Info</DialogTitle> */}
        <DialogContent>
          <DialogContentText sx={{pb : 2}}>
            <Typography sx={{ color: THEME.COLORS.text }}>
              Jobs
            </Typography>
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Sr no</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Admin Commission</StyledTableCell>
                  <StyledTableCell align="right">Total Wages</StyledTableCell>
                  <StyledTableCell align="right">Total Minutes</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.jobs?.length && data.jobs.map((job, index) => (
                  <StyledTableRow
                    key={job.jobId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {index+1}
                    </StyledTableCell>
                    <StyledTableCell align="right">{`${job.jobName}`}</StyledTableCell>
                    <StyledTableCell align="right">{job?.adminCommision || 0}</StyledTableCell>
                    <StyledTableCell align="right">{job.totalEarnings.toFixed(2)}</StyledTableCell>
                    <StyledTableCell align="right">{job.totalMinutes}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: THEME.COLORS.text }} variant="contained" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}