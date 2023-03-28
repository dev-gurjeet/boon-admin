import React, { useEffect, useState } from "react";
import { THEME } from "../utils/constants";
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, Stack, TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from "../api/axiosInstance";
import { getAllWorker } from "../redux/WorkerReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const ReferInfo = () => {
  const [workers, setWorkers] = useState([])
  const [workersList, setWorkersList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refferedBy, setRefferedBy] = useState('')
  const [referralTo, setReferralTo] = useState('')
  const [jobId, setJobId] = useState('')

  const dispatch = useDispatch();

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

  useEffect(() => { getWorkerData() }, [referralTo, refferedBy])
  const getWorkerData = async () => {
    try {
      let body = {
        page: 1,
        limit: 10,
        refferedBy,
        referralTo,
        jobId
      }
      setIsLoading(true);
      const response = await axiosInstance.post("/admin/getAllReferralUsers", body);
      const { data } = response.data
      if (data)
        setWorkers(data);
      setIsLoading(false)
    }
    catch (e) {
      setIsLoading(false)
      console.log("error", e)
    }
  }
  console.log("workers", workers)
  return (<>
    <Stack direction="row" sx={{ mb: 5 }}
      justifyContent="space-evenly">
      <Autocomplete
        disablePortal
        defaultValue={refferedBy}
        onChange={(e, val) => setRefferedBy(val?.id || '')}
        id="combo-box-demo"
        options={workersList}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Refered by" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={workersList}
        defaultValue={referralTo}
        onChange={(e, val) => setReferralTo(val?.id || '')}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Refered to" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      />
      {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Job" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      /> */}
    </Stack>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Referred by</TableCell>
            <TableCell align="center">Referred to</TableCell>
            <TableCell align="center">Job</TableCell>
            <TableCell align="right">View more</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.length ? workers.map((worker) => (
            worker?.referralTo?.length && worker.referralTo.map((referal) => (
              <TableRow
                key={worker._id + referal.referralTo}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{worker?.firstName} {worker?.lastName}</TableCell>
                <TableCell align="center">{referal?.firstName} {referal?.lastName}</TableCell>
                <TableCell align="center">{referal?.jobDetails?._id || 'NA'}</TableCell>
                <TableCell align="right">View more...</TableCell>
              </TableRow>
            ))
          )) : <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell colSpan="5">
              <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
              </Stack>
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }]
export default ReferInfo;
