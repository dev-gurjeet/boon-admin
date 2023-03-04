import { Box } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const BackNavigate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ py: 1 }}>
        <ArrowBackIcon
          sx={{ color: "#000", fontSize: "40px", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
      </Box>
    </div>
  );
};

export default BackNavigate;
