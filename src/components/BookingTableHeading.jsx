import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
const TextCss = {
  color: THEME.COLORS.tableHeadText,

  fontWeight: 500,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const BookingTableTableHeading = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#0a3444',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Job id</StyledTableCell>
        <StyledTableCell align="left">Company Name</StyledTableCell>
        <StyledTableCell align="center">Price</StyledTableCell>
        <StyledTableCell align="center">Job Name</StyledTableCell>
        <StyledTableCell align="center">Mad. P</StyledTableCell>
        <StyledTableCell align="right">Commission</StyledTableCell>
        <StyledTableCell align="center">Status</StyledTableCell>
      </TableRow>
    </TableHead>
  )
  return (
    <div>
      <Stack direction="row" alignItems="center">
        {/* <Box sx={{ flex: 0.2 }}>
          <Typography style={TextCss}>#</Typography>
        </Box> */}
        <Box sx={{ flex: 0.5 }}>
          <Typography style={TextCss}>Job id</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Company Name</Typography>
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <Typography style={TextCss}>price</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Job Name</Typography>
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <Typography style={TextCss}>Mod. P</Typography>
        </Box>
        <Box sx={{ flex: 0.7 }}>
          <Typography style={TextCss}>Commission</Typography>
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <Typography style={TextCss}>Status</Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default BookingTableTableHeading;
