import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BookingTableTableHeading from "../components/BookingTableHeading";
import BookingTableItem from "../components/BookingTableItem";
import { CustomPagination } from "../components/styledComponent";
import { getAllBookings } from "../redux/commonReducer";
import { getAllcontractorJobs } from "../redux/ContractorReducer";
import { clearupdatejob, updateJobPrice, deleteJob } from "../redux/JobReducer";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import { THEME } from "../utils/constants";
import SearchIcon from "@mui/icons-material/Search";
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
const Booking = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('')
  let debounce = '';
  const [state, setState] = useState({
    dialog: false,
    originalPrice: "",
    price: "",
    anchor: null,
    id: "",
    page: 1,
    percentage: "",
    err: false,
  });
  const {
    getAllcontractorJobs_isLoading,
    getAllcontractorJobs_Data,
    getAllcontractorJobs_isError,
  } = useSelector((store) => store.contractorStore);

  const {
    updateJobPrice_isLoading,
    updateJobPrice_Data,
    updateJobPrice_isError,
  } = useSelector((store) => store.jobStore);
  const onChangePage = (e, value) => {
    const body = {
      page: value,
      limit: 10,
      search
    };
    setState({ ...state, page: value });
    dispatch(getAllcontractorJobs(body));
  };
  const handleModify = () => {
    if (!String(state.percentage).trim()) {
      setState((prev) => ({ ...prev, err: true }));
      return;
    }
    if (state.price && state.percentage) {
      const totalPrice = (Number(state.price ? state.price : state.originalPrice) *
        Number(state.percentage)) /
        100;

      const body = {
        jobId: state.id,
        adminCommision: totalPrice,
        modifiedPrice:
          Number(state.price ? state.price : state.originalPrice) -
          Number(totalPrice),
        newJobPrice: Number(state.price),
      };
      dispatch(updateJobPrice(body));
    }
    if (!state.price && state.percentage) {
      const totalPrice =
        (Number(state.price ? state.price : state.originalPrice) *
          Number(state.percentage)) /
        100
      const body = {
        jobId: state.id,
        adminCommision: Number(totalPrice),
        modifiedPrice:
          Number(state.price ? state.price : state.originalPrice) -
          Number(totalPrice),
      };
      dispatch(updateJobPrice(body));
    }
  };
  // const handleModify = () => {
  //   let totalPrice = 0;
  //   if (state.price || state.percentage) {
  //     if (!state.price) {
  //       if (!String(state.percentage).trim()) {
  //         setState((prev) => ({ ...prev, err: true }));
  //         return;
  //       }
  //       totalPrice = Math.floor(
  //         (Number(state.originalPrice) *
  //           Number(state.percentage)) /
  //         100
  //       );
  //     }
  //     else {
  //       totalPrice = Number(state.originalPrice) - Number(state.price)
  //     }
  //     const body = {
  //       jobId: state.id,
  //       adminCommision: totalPrice,
  //       modifiedPrice: Number(state.originalPrice) - Number(totalPrice),
  //       //   Number(state.price ? state.price : state.originalPrice) -
  //       //   Number(totalPrice),
  //       newJobPrice: Number(state.originalPrice) - Number(totalPrice),
  //     };
  //     console.log("here", body)
  //     return
  //     dispatch(updateJobPrice(body));
  //   }
  // };

  const handleRejected = (id) => {
    const body = {
      jobId: id,
      status: "REJECTED",
    };
    dispatch(updateJobPrice(body));
    setState({ ...state, anchor: null });
  };

  const handleCanceled = (id) => {
    const body = {
      jobId: id,
      status: "CANCELLED",
    };
    dispatch(updateJobPrice(body));
    setState({ ...state, anchor: null });
  };
  const deleteJobById = (id) => {
    dispatch(deleteJob(id));
  }
  useEffect(() => {
    if (updateJobPrice_Data) {
      toast.success("Job Status Updated");
      dispatch(clearupdatejob());
      const body = {
        limit: 10,
        page: getAllcontractorJobs_Data?.currentPage,
        search
      };
      dispatch(getAllcontractorJobs(body));
      setState({ ...state, price: "", anchor: null, id: "", dialog: false });
    }
    if (updateJobPrice_isError) {
      toast.error("somthing went wrong");
      dispatch(clearupdatejob());
    }
  }, [updateJobPrice_Data, updateJobPrice_isError]);

  useEffect(() => {
    const body = {
      limit: 10,
      page: 1,
      search
    };
    dispatch(getAllcontractorJobs(body));
  }, []);
  useEffect(() => {
    if (getAllcontractorJobs_Data) {
      setState({ ...state, page: getAllcontractorJobs_Data?.currentPage });
    }
  }, [getAllcontractorJobs_Data]);
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
      dispatch(getAllcontractorJobs(body));
    }, 500)
  }
  return (
    <div>
      <Dialog
        open={state.dialog}
        onClose={() =>
          setState({
            ...state,
            dialog: false,
            price: "",
            percentage: "",
            originalPrice: "",
            err: false,
          })
        }
        PaperProps={{
          sx: { borderRadius: "10px", width: "350px", backgroundColor: THEME.COLORS.backgroundSecondary, color: THEME.COLORS.text },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{}}>
            Modify Your Price
          </Typography>
          <Divider sx={{ my: 0.7 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 400 }}>
              Contractor Price{" "}
              <span style={{ fontWeight: 600 }}>${state.originalPrice}</span>
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 400 }}>
              Enter New Job Price (optional)
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              type="number"
              value={state.price}
              sx={{ input: { color: THEME.COLORS.text } }}
              onChange={(e) => setState({ ...state, price: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <Typography sx={{ color: THEME.COLORS.text }}>$</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 400 }}>
              Enter Commision Percentage
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={state.percentage}
              type="number"
              sx={{ input: { color: THEME.COLORS.text } }}
              onChange={(e) =>
                setState({ ...state, percentage: e.target.value, err: false })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography sx={{ color: THEME.COLORS.text }}>%</Typography>
                  </InputAdornment>
                ),
              }}
            />
            {state.err && (
              <Typography color="error">percentage required</Typography>
            )}
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ my: 2 }}
            gap={2}
          >
            <Button
              size="small"
              onClick={() =>
                setState({
                  ...state,
                  dialog: false,
                  price: "",
                  percentage: "",
                  originalPrice: "",
                  err: false,
                })
              }
              sx={{
                color: "#000",
                backgroundColor: "#D1D1D1",
                "&:hover": {
                  backgroundColor: "#D1D1D1",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            {updateJobPrice_isLoading ? (
              <CircularProgress sx={{ color: THEME.COLORS.text }} />
            ) : (
              <Button
                size="small"
                onClick={handleModify}
                variant="contained"
                sx={{
                  backgroundColor: THEME.COLORS.secondary,
                  color: THEME.COLORS.text,
                  "&:hover": {
                    backgroundColor: THEME.COLORS.secondary,
                  },
                }}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Box>
      </Dialog>

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
        <Box sx={{ mb: 5, mt: 1 }}>
          <Typography sx={{ color: THEME.COLORS.text, fontSize: "18px", fontWeight: 500 }}>
            Contractor Jobs
          </Typography>
        </Box>
        <Stack direction="row" sx={{ mb: 1 }}>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              searchQuery(e.target.value);
            }}
            variant="outlined"
            placeholder="Search job..."
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
            <BookingTableTableHeading />

            <TableBody>
              {/* <Divider sx={{ my: 1 }} /> */}
              {getAllcontractorJobs_isLoading ? (
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="8">
                    <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                      <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                getAllcontractorJobs_Data?.data?.map((item, itemIndex) => (
                  // <Box key={itemIndex}>
                  <BookingTableItem
                    address={item?.jobName}
                    company={item?.companyName}
                    id={
                      (getAllcontractorJobs_Data?.currentPage - 1) * 10 +
                      itemIndex +
                      1
                    }
                    jobid={item?._id}
                    phone={item?.phone}
                    price={item?.price}
                    status={item?.status}
                    state={state}
                    setState={setState}
                    handleRejected={handleRejected}
                    handleCanceled={handleCanceled}
                    modifiedPrice={item?.modifiedPrice}
                    adminCommision={item?.adminCommision}
                    deleteJob={deleteJobById}
                  />
                  //   <Divider sx={{ my: 1 }} />
                  // </Box>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getAllcontractorJobs_Data?.totalPage}
          defaultPage={state.page}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </div>
  );
};

export default memo(Booking);
