import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearContractorDetail,
  contractorDetailById,
  contractorJobById,
} from "../redux/ContractorReducer";
import TableBody from '@mui/material/TableBody';
import BookingTableTableHeading from "../components/BookingTableHeading";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
// import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PATH, THEME } from "../utils/constants";
// import BookingTableHeading from "../components/BookingTableHeading";
import BookingTableItem from "../components/BookingTableItem";
import { clearupdatejob, updateJobPrice } from "../redux/JobReducer";
import { toast } from "react-toastify";
import BackNavigate from "../components/BackNavigate";
import { memo } from "react";
import { makeStyles } from "@mui/styles";
import SmsIcon from "@mui/icons-material/Sms";
import { CustomPagination } from "../components/styledComponent";
import dayjs from "dayjs";
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
const ContractorDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    dialog: false,
    price: "",
    percentage: "",
    originalPrice: "",
    anchor: null,
    id: "",
    err: false,
    page: 1,
  });
  const {
    contractorDetail_isLoading,
    contractorDetail_Data,
    contractorDetail_isError,

    contractorJobById_isLoading,
    contractorJobById_Data,
    contractorJobById_isError,
  } = useSelector((store) => store.contractorStore);
  const {
    updateJobDetail_isLoading,
    updateJobDetail_Data,
    updateJobDetail_isError,

    updateJobPrice_isLoading,
    updateJobPrice_Data,
    updateJobPrice_isError,
  } = useSelector((store) => store.jobStore);
  const handleModify = () => {
    if (!String(state.percentage).trim()) {
      setState((prev) => ({ ...prev, err: true }));
      return;
    }
    if (state.price && state.percentage) {
      const totalPrice = Math.floor(
        (Number(state.price ? state.price : state.originalPrice) *
          Number(state.percentage)) /
        100
      );

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
      const totalPrice = Math.floor(
        (Number(state.price ? state.price : state.originalPrice) *
          Number(state.percentage)) /
        100
      );
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

  const handleRejected = () => {
    const body = {
      jobId: state.id,
      status: "REJECTED",
    };
    dispatch(updateJobPrice(body));
  };
  const onChangePage = (e, value) => {
    const body = {
      id,
      page: value,
      limit: 7,
    };
    setState((prev) => ({ ...prev, page: value }));
    dispatch(contractorJobById(body));
  };
  useEffect(() => {
    if (updateJobDetail_Data) {
      toast.success("Job Status Updated");
      dispatch(clearupdatejob());
      dispatch(contractorJobById(id));
      setState({ ...state, price: "", anchor: null, id: "", dialog: false });
    }
    if (updateJobDetail_isError) {
      toast.error("somthing went wrong");
      dispatch(clearupdatejob());
    }
  }, [updateJobDetail_Data, updateJobDetail_isError]);
  useEffect(() => {
    if (updateJobPrice_Data) {
      toast.success("Job Status Updated");
      dispatch(clearupdatejob());
      dispatch(contractorJobById(id));
      setState({ ...state, price: "", anchor: null, id: "", dialog: false });
    }
    if (updateJobPrice_isError) {
      toast.error("somthing went wrong");
      dispatch(clearupdatejob());
    }
  }, [updateJobPrice_Data, updateJobPrice_isError]);
  useEffect(() => {
    const body = {
      id,
      page: 1,
      limit: 7,
    };
    dispatch(contractorDetailById(id));
    dispatch(contractorJobById(body));
  }, []);
  useEffect(() => {
    return () => {
      dispatch(clearContractorDetail());
    };
  }, []);
  console.log("contractorDetail_Data", contractorDetail_Data);
  return (
    <>
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
          sx: { borderRadius: "10px", width: "350px" },
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
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 400 }}>
              Enter Modified Price
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={state.price}
              onChange={(e) => setState({ ...state, price: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <Typography>$</Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 400 }}>
              Enter Percentage
            </Typography>
            <TextField
              variant="standard"
              fullWidth
              value={state.percentage}
              onChange={(e) =>
                setState({ ...state, percentage: e.target.value, err: false })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography>%</Typography>
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
              <CircularProgress sx={{ color: THEME.COLORS.primary }} />
            ) : (
              <Button
                size="small"
                onClick={handleModify}
                variant="contained"
                sx={{
                  backgroundColor: THEME.COLORS.primary,
                  "&:hover": {
                    backgroundColor: THEME.COLORS.primary,
                  },
                }}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Box>
      </Dialog>
      <BackNavigate />
      <Box
        sx={{
          backgroundColor: "#0F1C24",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0px 4px 6px rgba(62, 73, 84, 0.04)",
          borderRadius: "6px",
          py: 3,
          px: 5,
        }}
      >

        <Stack direction="row" gap={2} alignItems="center">
          <Typography sx={{ fontSize: "18px", fontWeight: 500, color: THEME.COLORS.text }}>
            Contractor Details
          </Typography>
          <IconButton
            onClick={() => navigate(`${PATH.Chat}?id=${id}&role=CONTRACTOR`)}
          >
            <SmsIcon sx={{ color: THEME.COLORS.secondary, cursor: "pointer" }} />
          </IconButton>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {contractorDetail_isLoading ? (
          <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
            <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
          </Stack>
        ) : (
          <>
            <Grid container spacing={8}>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.firstName}
                    {contractorDetail_Data?.data?.lastName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Company Name
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.companyName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={8} sx={{ pt: 4 }}>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.email}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    City
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.address?.subLocality}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={8} sx={{ pt: 4 }}>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Phone
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    +1 {contractorDetail_Data?.data?.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: THEME.COLORS.text, fontSize: '14px'
                    }}
                  >
                    Country
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.address?.country}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={8} sx={{ pt: 4 }}>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Address Line 1
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                    >
                      {contractorDetail_Data?.data?.address?.streetAddress}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: THEME.COLORS.text, fontSize: '14px'
                    }}
                  >
                    Address Line 2
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {contractorDetail_Data?.data?.address?.region}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={8} sx={{ pt: 4 }}>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    Postal Code
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                    >
                      {contractorDetail_Data?.data?.address?.postalCode}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6} container>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: THEME.COLORS.text, fontSize: '14px'
                    }}
                  >
                    Registration date
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: '14px' }}
                  >
                    {dayjs(contractorDetail_Data?.data?.createdAt).format('DD MMM, YYYY hh:mm A')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "#0F1C24",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0px 4px 6px rgba(62, 73, 84, 0.04)",
          borderRadius: "6px",
          py: 3,
          px: 5,
          mt: 2,
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} sx={{ minWidth: 700 }} aria-label="customized table">
            <BookingTableTableHeading />

            <TableBody>
              {/* <Divider sx={{ my: 2 }} /> */}
              {contractorJobById_isLoading || updateJobDetail_isLoading ? (
                <TableRow sx={{ backgroundColor: THEME.COLORS.backgroundSecondary }}>
                  <TableCell colSpan={8}>
                    <Stack direction="row" justifyContent="center" sx={{ my: 2, backgroundColor: THEME.COLORS.backgroundSecondary }}>
                      <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ) : (
                contractorJobById_Data?.data?.map((item, itemIndex) => (
                  // <Box key={itemIndex}>
                  <BookingTableItem
                    address={item?.jobName}
                    company={item?.companyName}
                    id={itemIndex + 1}
                    jobid={item?._id}
                    phone={item?.phone}
                    price={item?.price}
                    status={item?.status}
                    state={state}
                    setState={setState}
                    handleRejected={handleRejected}
                    modifiedPrice={item?.modifiedPrice}
                    adminCommision={item?.adminCommision}
                  />
                  //   <Divider sx={{ my: 1 }} />
                  // </Box>
                ))
              )}    </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, my: 2 }}>
        <CustomPagination
          count={contractorJobById_Data?.totalPage}
          defaultPage={state.page}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>

    </>
  );
};

export default memo(ContractorDetail);
