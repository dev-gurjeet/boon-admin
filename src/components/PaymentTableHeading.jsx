import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
const TextCss = {
  color: THEME.COLORS.tableHeadText,
  fontFamily: "Roboto",
  fontWeight: 550,
  letterSpacing: "1px",
  textTransform: "uppercase",
};
const PaymentTableTableHeading = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flex: 0.3 }}>
          <Typography style={TextCss}>#</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Customer</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Service</Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Address</Typography>
        </Box>
        <Box sx={{ flex: 0.6 }}>
          <Typography style={TextCss}>Payment</Typography>
        </Box>
        <Box sx={{ flex: 0.6 }}>
          <Typography style={TextCss}>action</Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default PaymentTableTableHeading;
