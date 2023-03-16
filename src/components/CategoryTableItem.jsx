import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH, THEME } from "../utils/constants";
import RadioButton from "./RadioButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const textCss = {
  color: "#fff",
  fontFamily: "Roboto",
  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "16px",
};
const CategoryTableItem = ({
  id,
  dbId,
  categoryName,
  createDate,
  handleDelete,
  handleEdit,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ flex: 0.3 }}>
        <Typography style={textCss}>#{id}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{categoryName}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <img
          src={image}
          style={{ height: "50px", width: "50px", objectFit: "contain" }}
        />
      </Box>
      <Stack sx={{ flex: 1 }} direction="row" gap={2}>
        <IconButton onClick={() => handleEdit(dbId, categoryName, image)}>
          <EditIcon sx={{ color: THEME.COLORS.secondary }} />
        </IconButton>
        <IconButton onClick={() => handleDelete(dbId)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default CategoryTableItem;
