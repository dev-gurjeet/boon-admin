
import React, { useEffect, useState } from "react";
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

const WorkerEarnings = () => {
	let [workers, setWorkers] = useState([]);
	let [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
	let [endDate, setEndDate] = useState(dayjs());
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		getWorkerData();
	}, [])

	useEffect(() => {
		getWorkerData();
	}, [startDate, endDate])
	const getWorkerData = async () => {
		try {
			setIsLoading(true)
			const response = await axiosInstance.post("/admin/getWorkerEarnings", { startDate, endDate });
			const { data } = response.data
			setWorkers(data);
			setIsLoading(false)
		}
		catch (e) {
			setIsLoading(false)
			console.log("error", e)
		}
	}
	const handleStart = (date) => {
		setStartDate(date)
	}
	const handleEnd = (date) => {
		setEndDate(date)
	}
	return (
		<>
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
							<TableCell align="right">Total earnings</TableCell>
							<TableCell align="right">View more</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{workers.length ? workers.map((worker, index) => (
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
								<TableCell align="right">{worker.totalEarnings}</TableCell>
								<TableCell align="right">View more...</TableCell>
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
export default WorkerEarnings;
