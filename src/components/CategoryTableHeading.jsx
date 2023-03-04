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
const CategoryTableTableHeading = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flex: 0.3 }}>
          <Typography style={TextCss}>#</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Category Name</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Image</Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography style={TextCss}>Actions</Typography>
        </Box>
      </Stack>
    </div>
  );
};

export default CategoryTableTableHeading;
