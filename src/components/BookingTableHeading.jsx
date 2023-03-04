import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
const TextCss = {
  color: THEME.COLORS.tableHeadText,

  fontWeight: 500,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const BookingTableTableHeading = () => {
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
