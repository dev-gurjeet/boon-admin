import { Box } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { THEME } from "../utils/constants";
const BackNavigate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ py: 1 }}>
        <ArrowBackIcon
          sx={{ color: THEME.COLORS.secondary, fontSize: "40px", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
      </Box>
    </div>
  );
};

export default BackNavigate;
