import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH, THEME } from "../utils/constants";
import RadioButton from "./RadioButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const textCss = {
  color: "#202020",
  fontFamily: "Roboto",
  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "16px",
};
const PaymentTableItem = ({
  id,
  dbId,
  customer,
  service,
  address,
  payment,
  status,
}) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ flex: 0.3 }}>
        <Typography style={textCss}>#{id}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{customer}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{service}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{address}</Typography>
      </Box>
      <Box sx={{ flex: 0.6 }}>
        <Typography style={textCss}>{payment}</Typography>
      </Box>
      <Box sx={{ flex: 0.6 }}>
        {status ? (
          <Typography
            sx={{ color: THEME.COLORS.primary, fontWeight: 600 }}
            variant="subtitle1"
          >
            Done
          </Typography>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: THEME.COLORS.primary,
              px: 1,
              "&:hover": {
                backgroundColor: THEME.COLORS.primary,
              },
            }}
          >
            Pay
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default PaymentTableItem;
