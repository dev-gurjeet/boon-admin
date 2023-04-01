import React, { useEffect, useState } from "react";
import { PATH, THEME } from "../utils/constants";
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from "../api/axiosInstance";
import { getAllWorker } from "../redux/WorkerReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ReferInfoModal from "./ReferInfoModal";
import { CustomPagination } from "./styledComponent";
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

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

const ReferInfo = () => {
  const navigate = useNavigate()
  const classes = useStyles();
  const dispatch = useDispatch();
  const [workers, setWorkers] = useState([])
  const [workersList, setWorkersList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refferedBy, setRefferedBy] = useState('')
  const [referralTo, setReferralTo] = useState('')
  const [jobId, setJobId] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([])

  const handleClickOpen = (data) => {
    setData(data)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangePage = (e, value) => {
    setPage(value);
  }
  const { getWorker_isLoading, getWorker_Data, getWorker_isError } =
    useSelector((store) => store.workerStore);
  useEffect(() => {
    dispatch(getAllWorker({ page: '', limit: '' }));
  }, [])
  useEffect(() => {
    if (getWorker_Data.status) {
      const list = getWorker_Data.data.map(itm => ({ label: `${itm.firstName} ${itm.lastName}`, id: itm._id }))
      setWorkersList(list)
    }
  }, [getWorker_Data])

  useEffect(() => { getWorkerData() }, [referralTo, refferedBy, page])
  const getWorkerData = async () => {
    try {
      let body = {
        page,
        limit,
        refferedBy,
        referralTo,
        jobId
      }
      setIsLoading(true);
      const response = await axiosInstance.post("/admin/getAllReferralUsers", body);
      const { data } = response
      if (data)
        setWorkers(data);
      setIsLoading(false)
    }
    catch (e) {
      setIsLoading(false)
      console.log("error", e)
    }
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

  return (<>
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
      <ReferInfoModal open={open} handleClose={handleClose} data={data} />
      <Stack direction="row" sx={{ mb: 5 }}
        justifyContent="space-evenly">
        <Autocomplete
          disablePortal
          defaultValue={refferedBy}
          onChange={(e, val) => setRefferedBy(val?.id || '')}
          id="combo-box-demo"
          options={workersList}
          sx={{ width: 300, color: THEME.COLORS.text, fieldset: { borderColor: THEME.COLORS.text }, button: { color: THEME.COLORS.text } }}
          renderInput={(params) => <TextField {...params} label="Refered by" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={workersList}
          defaultValue={referralTo}
          onChange={(e, val) => setReferralTo(val?.id || '')}
          sx={{ width: 300, color: THEME.COLORS.text, fieldset: { borderColor: THEME.COLORS.text }, button: { color: THEME.COLORS.text } }}
          renderInput={(params) => <TextField {...params} label="Refered to" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
        />
        {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, color: THEME.COLORS.text, fieldset:{borderColor: THEME.COLORS.text} }}
        renderInput={(params) => <TextField {...params} label="Job" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      /> */}
      </Stack>

      <TableContainer component={Paper}>
        <Table className={classes.table} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Referred by</StyledTableCell>
              <StyledTableCell align="center">Referred to</StyledTableCell>
              <StyledTableCell align="center">Total referral earning</StyledTableCell>
              <StyledTableCell align="right">View more</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {workers.data?.length ? workers?.data.map((worker) => (
              <StyledTableRow
                key={worker._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell>
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
                <StyledTableCell align="center">{worker?.referralTo?.length}</StyledTableCell>
                <StyledTableCell align="center">{worker?.totalReferralEarnings}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button variant="outlined" onClick={() => handleClickOpen(worker)}> View more</Button>
                </StyledTableCell>
              </StyledTableRow>
            )) : <StyledTableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell colSpan="5">
                <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                  {isLoading ?
                  <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
                  : "No Records"}
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
  </>)
}

export default ReferInfo;
