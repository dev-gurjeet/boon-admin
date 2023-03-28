
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { THEME } from "../utils/constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../api/axiosInstance';
import { Box, CircularProgress, Stack } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ContractorViewMore from "./contractorViewMore";
import { styled } from '@mui/material/styles';
import { CustomPagination } from "./styledComponent";
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
const ContractorWages = () => {
  const classes = useStyles();
  const [contractors, setContractors] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])

  const handleClickOpen = (worker) => {
    setData(worker)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangePage = (e, value) => {
    setPage(value);
  }

  const getContractorData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/admin/getContractorEarnings", { startDate, endDate, page, limit });
      const { data } = response
      setContractors(data);
      setIsLoading(false)
    }
    catch (e) {
      setIsLoading(false)
      console.log("error", e)
    }
  }
  useEffect(() => {
    getContractorData();
  }, [startDate, endDate, page])
  const handleStart = (date) => {
    setStartDate(date)
  }
  const handleEnd = (date) => {
    setEndDate(date.format('YYYY-MM-DD'))
  }
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
    <>
      <Box sx={{
          backgroundColor: THEME.COLORS.backgroundPrimary,
          color: THEME.COLORS.text,
          px: 2,
          py: 2,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          minHeight: "70vh",
          m: 2,
        }}>
        <ContractorViewMore open={open} handleClose={handleClose} data={data} />
        <Stack sx={{ mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text }, fieldset:{borderColor: THEME.COLORS.text}, button:{color: THEME.COLORS.text} }} value={startDate}
                onChange={handleStart} />
              <DatePicker label="End Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text }, fieldset:{borderColor: THEME.COLORS.text}, button:{color: THEME.COLORS.text} }} value={endDate}
                onChange={handleEnd} />
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
        <TableContainer component={Paper}>
          <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Sr no</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Total jobs</StyledTableCell>
                <StyledTableCell align="right">Total minutes</StyledTableCell>
                <StyledTableCell align="right">Total wages</StyledTableCell>
                <StyledTableCell align="right">View more</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {contractors?.data?.length ? contractors.data.map((worker, index) => (
                <StyledTableRow
                  key={worker._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {index+1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{`${worker.firstName} ${worker.lastName}`}</StyledTableCell>
                  <StyledTableCell align="right">{worker?.jobs?.length || 0}</StyledTableCell>
                  <StyledTableCell align="right">{worker.totalMinutes}</StyledTableCell>
                  <StyledTableCell align="right">{worker.totalContractorEarnings.toFixed(2)}</StyledTableCell>
                  <StyledTableCell align="right"><Button variant="outlined" onClick={() => handleClickOpen(worker)}>
                    View more
                  </Button></StyledTableCell>
                </StyledTableRow>
              )) : <StyledTableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell colSpan="6">
                  <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                    {isLoading ?
                      <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
                      : "No Records"
                    }
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, my: 2 }}>
        <CustomPagination
          count={contractors?.totalPage}
          defaultPage={page}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </>
  );
}
export default ContractorWages;
