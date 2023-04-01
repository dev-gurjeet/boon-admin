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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import { PATH, THEME } from '../utils/constants';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';

const textCsswithDeco = {
  color: THEME.COLORS.secondary,

  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "14px",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: THEME.COLORS.secondary,
  },
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
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
  const navigate = useNavigate();
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
          <DialogContentText sx={{ pb: 2 }}>
            <Typography sx={{ color: THEME.COLORS.text }}>
              Jobs
            </Typography>
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Job id</StyledTableCell>
                  <StyledTableCell align="right">Job name</StyledTableCell>
                  <StyledTableCell align="right">Admin commission</StyledTableCell>
                  <StyledTableCell align="right">Total wages</StyledTableCell>
                  <StyledTableCell align="right">Total minutes</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.jobs?.length && data.jobs.map((job, index) => (
                  <StyledTableRow
                    key={job.jobId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Stack sx={{ flex: 0.5 }} direction="row" alignItems="center" gap={0.7}>
                        <Typography
                          sx={textCsswithDeco}
                          onClick={() => navigate(`${PATH.BookingDetail}/${job.jobId}`)}
                        >
                          #{job.jobId?.slice(0, 6)}
                        </Typography>
                      </Stack>
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