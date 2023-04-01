import {
	Box,
	CircularProgress,
	Divider,
	InputAdornment,
	Stack,
	Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashboardTableHeading from "../components/DashboardTableHeading";
import DashboarTableItem from "../components/DashboarTableItem";
import { CustomPagination } from "../components/styledComponent";
import { clearUpdateuser } from "../redux/commonReducer";
import { getAllContractors } from "../redux/ContractorReducer";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { THEME } from "../utils/constants";
import TableRow from '@mui/material/TableRow';
import { dahboardTable } from "../utils/dummyData";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		borderColor: '#333 !important'
	},
}));
const Contractor = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	let debounce = '';
	const [state, setState] = useState(1);
	const [search, setSearch] = useState('');
	const {
		getContractors_isLoading,
		getContractors_Data,
		getContractors_isError,
	} = useSelector((store) => store.contractorStore);
	const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
		useSelector((store) => store.commonStore);
	const onChangePage = (e, value) => {
		const body = {
			page: value,
			limit: 10,
			search
		};
		setState(value);
		dispatch(getAllContractors(body));
	};
	useEffect(() => {
		const body = {
			page: state,
			limit: 10,
			search
		};
		dispatch(getAllContractors(body));
	}, []);
	useEffect(() => {
		if (updateUser_Data) {
			toast.success("User Updated");
			dispatch(clearUpdateuser());
			const body = {
				page: state,
				limit: 10,
			};
			dispatch(getAllContractors(body));
		}
		if (updateUser_isError) {
			toast.error(
				updateUser_isError?.message
					? updateUser_isError?.message
					: "somthing went wrong"
			);
			dispatch(clearUpdateuser());
		}
	}, [updateUser_Data, updateUser_isError]);

	useEffect(() => {
		setState(getContractors_Data?.currentPage);
	}, [getContractors_Data]);
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
	const searchQuery = (searchVal) => {
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			const body = {
				page: 1,
				limit: 10,
				search: searchVal
			};
			setSearch(searchVal)
			dispatch(getAllContractors(body));
		}, 500)
	}
	return (
		<div>
			<Box
				sx={{
					backgroundColor: THEME.COLORS.backgroundPrimary,
					px: 2,
					py: 1,
					boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
					borderRadius: "5px",
					m: 2,
					minHeight: "70vh",
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ mb: 5, mt: 1 }}
				>
					<Typography sx={{ color: THEME.COLORS.text, fontSize: "18px", fontWeight: 500 }}>
						Contractors
					</Typography>
				</Stack>
				<Stack direction="row" sx={{ mb: 1 }}>
					<TextField
						id="search-bar"
						className="text"
						onInput={(e) => {
							searchQuery(e.target.value);
						}}
						variant="outlined"
						placeholder="Search..."
						size="small"
						sx={{
							input: {
								color: THEME.COLORS.text
							},
							fieldset: {
								borderColor: THEME.COLORS.text
							}
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment>
									<SearchIcon style={{ fill: THEME.COLORS.text }} />
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<TableContainer component={Paper}>
					<Table className={classes.table} sx={{ minWidth: 700 }} aria-label="customized table">
						<DashboardTableHeading />
						{/* <Divider sx={{ mt: 0.5 }} /> */}
						<TableBody sx={{ borderColor: '#333 !important' }}>
							{getContractors_isLoading || updateUser_isLoading ? (
								<StyledTableRow>
									<StyledTableCell align="center" colSpan="6">
										<Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
											<CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
										</Stack>
									</StyledTableCell>
								</StyledTableRow>
							) : (
								getContractors_Data?.data?.map((item, itemIndex) => (
									// <Box key={itemIndex} sx={{ py: 1 }}>
									<DashboarTableItem
										id={(getContractors_Data?.currentPage - 1) * 10 + itemIndex + 1}
										dbId={item?._id}
										address={item?.address?.formattedAddress}
										email={item?.email}
										name={item?.firstName}
										phone={item?.phoneNumber}
										img={item?.profile_pic}
										checked={item?.isActive}
									/>
									// <Divider sx={{ mt: 0.5 }} />
									// </Box>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
				<CustomPagination
					count={getContractors_Data?.totalPage}
					defaultPage={state}
					shape="rounded"
					variant="outlined"
					onChange={onChangePage}
				/>
			</Stack>
		</div>
	);
};

export default memo(Contractor);
