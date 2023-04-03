import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
const TextCss = {
  color: THEME.COLORS.tableHeadText,
  fontFamily: "Roboto",
  fontWeight: 550,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const ActiveWorkerTableHeading = () => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: THEME.COLORS.primary,
        color: theme.palette.common.white,
        borderColor: "#333 !important",
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Sr. No</StyledTableCell>
        <StyledTableCell align="left">Name</StyledTableCell>
        <StyledTableCell align="center">Phone</StyledTableCell>
        {/* <StyledTableCell align="center">Address</StyledTableCell> */}
        <StyledTableCell align="center">Category</StyledTableCell>
        <StyledTableCell align="center">Experience</StyledTableCell>
        <StyledTableCell align="center">Missed Jobs</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </TableRow>
    </TableHead>
  )
  return (
    <div>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flex: 0.3 }}>
          <Typography style={TextCss}>#</Typography>
        </Box>
        <Box sx={{ flex: 0.7 }}>
          <Typography style={TextCss}>name</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>phone</Typography>
        </Box>
        {/* <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Address</Typography>
        </Box> */}
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Category</Typography>
        </Box>
        <Box sx={{ flex: 0.6 }}>
          <Typography style={TextCss}>Experience</Typography>
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <Typography style={TextCss}>Action</Typography>
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <Typography style={TextCss}>Suspended</Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default ActiveWorkerTableHeading;
