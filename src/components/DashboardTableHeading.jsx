import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const TextCss = {
  color: THEME.COLORS.text,
  fontFamily: "Roboto",
  fontWeight: 550,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const DashboardTableHeading = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: THEME.COLORS.primary,
      color: THEME.COLORS.text,
      borderColor: '#333 !important'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <TableHead sx={{ display: "table-header-group" }}>
      <TableRow>
        <StyledTableCell>Sr. No</StyledTableCell>
        <StyledTableCell align="left">Name</StyledTableCell>
        <StyledTableCell align="center">Phone</StyledTableCell>
        <StyledTableCell align="center">Address</StyledTableCell>
        <StyledTableCell align="center">Email</StyledTableCell>
        <StyledTableCell align="center">Action</StyledTableCell>
      </TableRow>
    </TableHead>
  )
};

export default DashboardTableHeading;
