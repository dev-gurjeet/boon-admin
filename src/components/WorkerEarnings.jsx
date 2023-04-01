
import React, { useEffect, useState } from "react";
import { PATH, THEME } from "../utils/constants";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../api/axiosInstance';
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import WorkerViewMore from "./workerViewMore";
import { CustomPagination } from "./styledComponent";
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const WorkerEarnings = () => {
	const navigate = useNavigate()
	const classes = useStyles();
	let [workers, setWorkers] = useState([]);
	let [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
	let [endDate, setEndDate] = useState(dayjs());
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [searchParams, setSearchParams] = useSearchParams();

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

	const updateUrlParams = () => {
		setSearchParams({ startDate, endDate })
	}
	const checkUrlParams = () => {
		const start = searchParams.get("startDate");
		const end = searchParams.get("endDate");
		if (start && end) {
			setStartDate(dayjs(start))
			setEndDate(dayjs(end))
		}
	}
	useEffect(() => {
		checkUrlParams();
	}, [])
	useEffect(() => {
		getWorkerData();
		updateUrlParams();
	}, [startDate, endDate, page])
	const getWorkerData = async () => {
		try {
			setIsLoading(true)
			const response = await axiosInstance.post("/admin/getWorkerEarnings", { startDate, endDate, page, limit });
			const { data } = response
			setWorkers(data);
			setIsLoading(false)
		}
		catch (e) {
			setIsLoading(false)
			console.log("error", e)
		}
	}
	const handleStart = (date) => {
		setStartDate(dayjs(date))
	}
	const handleEnd = (date) => {
		setEndDate(dayjs(date))
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
				<WorkerViewMore open={open} handleClose={handleClose} data={data} />
				<Stack sx={{ mb: 3 }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={['DatePicker']}>
							<DatePicker label="Start Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text }, fieldset: { borderColor: THEME.COLORS.text }, button: { color: THEME.COLORS.text } }} value={startDate}
								onChange={handleStart} />
							<DatePicker label="End Date" sx={{ input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text }, fieldset: { borderColor: THEME.COLORS.text }, button: { color: THEME.COLORS.text } }} value={endDate}
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
								<StyledTableCell align="right">Total earnings</StyledTableCell>
								<StyledTableCell align="right">View more</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{workers?.data?.length ? workers.data.map((worker, index) => (
								<StyledTableRow
									key={worker._id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<StyledTableCell component="th" scope="row">
										{index + 1}
									</StyledTableCell>
									<StyledTableCell align="right">
										<Stack sx={{ flex: 0.7 }} direction="row" alignItems="center" gap={1}>
											{worker.profile_pic ? (
												<Box>
													<img
														src={worker.profile_pic}
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
														{worker.firstName ? worker.firstName?.slice(0, 1) : "B"}
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
												onClick={() => navigate(`${PATH.WorkerDetail}/${worker._id}`)}
											>
												{worker.firstName} {worker.lastName}
											</Typography>
										</Stack>
									</StyledTableCell>
									<StyledTableCell align="right">{worker?.jobs?.length || 0}</StyledTableCell>
									<StyledTableCell align="right">{worker.totalMinutes}</StyledTableCell>
									<StyledTableCell align="right">{worker?.totalEarnings?.toFixed(2)}</StyledTableCell>
									<StyledTableCell align="right">
										<Button variant="outlined" onClick={() => handleClickOpen(worker)}> View more</Button>
									</StyledTableCell>
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
					count={workers?.totalPage}
					defaultPage={page}
					shape="rounded"
					variant="outlined"
					onChange={onChangePage}
				/>
			</Stack>
		</>
	);
}
export default WorkerEarnings;
