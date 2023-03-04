import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
const TextCss = {
  color: THEME.COLORS.tableHeadText,
  fontWeight: 500,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const BookingDetailTableHeading = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flex: 0.3 }}>
          <Typography style={TextCss}>#</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Worker Id</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Name</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Email</Typography>
        </Box>
        <Box sx={{ flex: 0.5 }}>
          <Typography style={TextCss}>Action</Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default BookingDetailTableHeading;
