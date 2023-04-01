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

export default function ReferInfoModal({ open, handleClose, data = [] }) {
  const navigate = useNavigate()
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
        {/* <DialogTitle><b>{data?.firstName} {data?.lastName}</b> referred the following workers - </DialogTitle> */}
        <DialogContent>
          <DialogContentText sx={{ pb: 2 }}>
            <Typography sx={{ color: THEME.COLORS.text }}>
              <b>{data?.firstName} {data?.lastName}</b> referred the following workers -
            </Typography>
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Sin number</StyledTableCell>
                  <StyledTableCell align="center">Job name</StyledTableCell>
                  <StyledTableCell align="right">Earnings</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data?.referralTo?.length && data.referralTo.map((item) => (
                  <StyledTableRow
                    key={item.referralTo}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell>
                      <Stack sx={{ flex: 0.7 }} direction="row" alignItems="center" gap={1}>
                        {item.profile_pic ? (
                          <Box>
                            <img
                              src={item.profile_pic}
                              alt="personimage"
                              style={{
                                height: "30px",
                                width: "30px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                cursor: "pointer",
                              }}
                            />
                          </Box>
                        ) : (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              height: "30px",
                              width: "30px",
                              borderRadius: "50%",
                              backgroundColor: "primary.main",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#fff",
                                textTransform: "capitalize",
                                fontWeight: 600,
                                fontSize: "20px",
                              }}
                            >
                              {item.firstName ? item.firstName?.slice(0, 1) : "B"}
                            </Typography>
                          </Stack>
                        )}
                        <Typography
                          style={{
                            fontWeight: 400,
                            letterSpacing: "1px",
                            fontSize: "14px",
                            wordWrap: "wrap",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                          }}
                          onClick={() => navigate(`${PATH.WorkerDetail}/${item._id}`)}
                        >
                          {item.firstName} {item.lastName}
                        </Typography>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="center">{item?.sinNumber && !item?.sinNumber?.includes('https') && item?.sinNumber}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography
                        sx={textCsswithDeco}
                        onClick={() => navigate(`${PATH.BookingDetail}/${item?.jobDetails?.jobId}`)}
                      >
                        {item?.jobDetails?.jobName}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">{item?.referralEarnings}</StyledTableCell>
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