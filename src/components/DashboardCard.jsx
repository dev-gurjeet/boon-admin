import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { THEME } from "../utils/constants";
import CountUp from "react-countup";
const DashboardCard = ({ icon, name, number }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#0f1c24",
        boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
        height: "100px",
        width: "250px",
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        {icon}
        <Box
          sx={{
            height: "50px",
            width: "2px",
            backgroundColor: THEME.COLORS.text,
          }}
        ></Box>
        <Box>
          <Typography
            sx={{
              color: THEME.COLORS.text,
              fontSize: "17px",
              textAlign: "center",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontSize: "30px",
              color: "#ffffff",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            <CountUp start={0} end={number} duration={2.5} />
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DashboardCard;
