
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { THEME } from "../utils/constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../api/axiosInstance';
import { CircularProgress, Stack } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ContractorViewMore from "./contractorViewMore";
// import ViewMoreContractorWages from "./ViewMoreContractor";

const ContractorWages = () => {
  const [contractors, setContractors] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false)

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])

  const handleClickOpen = (worker) => {
    setData(worker)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getWorkerData();
  }, [])
  const getWorkerData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/admin/getContractorEarnings", { startDate, endDate });
      const { data } = response.data
      setContractors(data);
      setIsLoading(false)
    }
    catch (e) {
      setIsLoading(false)
      console.log("error", e)
    }
  }
  useEffect(() => {
    getWorkerData();
  }, [startDate, endDate])
  const handleStart = (date) => {
    setStartDate(date)
  }
  const handleEnd = (date) => {
    setEndDate(date.format('YYYY-MM-DD'))
  }
  return (
    <>
      <ContractorViewMore open={open} handleClose={handleClose} data={data} />
      <Stack sx={{ mb: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Start Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} value={startDate}
              onChange={handleStart} />
            <DatePicker label="End Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} value={endDate}
              onChange={handleEnd} />
          </DemoContainer>
        </LocalizationProvider>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Sr no</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Total jobs</TableCell>
              <TableCell align="right">Total minutes</TableCell>
              <TableCell align="right">Total wages</TableCell>
              <TableCell align="right">View more</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contractors.length ? contractors.map((worker, index) => (
              <TableRow
                key={worker._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{`${worker.firstName} ${worker.lastName}`}</TableCell>
                <TableCell align="right">{worker?.jobs?.length || 0}</TableCell>
                <TableCell align="right">{worker.totalMinutes}</TableCell>
                <TableCell align="right">{worker.totalContractorEarnings.toFixed(2)}</TableCell>
                <TableCell align="right"><Button variant="outlined" onClick={() => handleClickOpen(worker)}>
                  View more
                </Button></TableCell>
              </TableRow>
            )) : <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell colSpan="6">
                <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                  {isLoading ?
                    <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
                    : "No Records"
                  }
                </Stack>
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ContractorWages;
