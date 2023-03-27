import React, { useState } from "react";
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
const ReferInfo = () => {
  const [workers, setWorkers] = useState([])
  return (<>
    <Stack direction="row" sx={{mb:5}}
      justifyContent="space-evenly">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Refered from" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Refered to" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300, color: THEME.COLORS.text }}
        renderInput={(params) => <TextField {...params} label="Job" sx={{ color: THEME.COLORS.text, input: { color: THEME.COLORS.text }, label: { color: THEME.COLORS.text } }} />}
      />
    </Stack>
    
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Sr no</TableCell>
              <TableCell align="right">Referred by</TableCell>
              <TableCell align="right">Referred to</TableCell>
              <TableCell align="right">Job</TableCell>
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
                <TableCell align="right">{worker?.jobs?.length || 0}</TableCell>
                <TableCell align="right">{worker.totalMinutes}</TableCell>
                <TableCell align="right">{worker.totalContractorEarnings.toFixed(2)}</TableCell>
                <TableCell align="right">View more...</TableCell>
              </TableRow>
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
