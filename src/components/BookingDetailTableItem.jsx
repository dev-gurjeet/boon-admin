import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { blue, green, red } from "@mui/material/colors";
import { PATH, THEME } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const textCss = {
  color: "#fff",
  fontWeight: 400,
  letterSpacing: "1px",

  fontSize: "14px",
};
const textCsswithDeco = {
  color: THEME.COLORS.secondary,

  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "14px",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: blue[900],
  },
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const BookingDetailTableItem = ({
  id,
  jobid,
  status,
  workerId,
  name,
  email,
  state,
  setState,
  handleReject,
  handleAccept,
  handleReassignClick,
}) => {
  const navigate = useNavigate();
  const open = Boolean(state.anchor);
  const handleClick = (event) => {
    setState({ ...state, anchor: event.currentTarget, id: jobid });
  };
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };

  return (
    <Stack direction="row" alignItems="center">
      <Box sx={{ flex: 0.3 }}>
        <Typography style={textCss}>#{id}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          style={textCsswithDeco}
          onClick={() => navigate(`${PATH.WorkerDetail}/${workerId}`)}
        >
          #{workerId?.slice(0, 7)}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          style={{
            color: "#fff",
            fontWeight: 400,
            letterSpacing: "1px",
            textTransform: "capitalize",
            fontSize: "14px",
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{email}</Typography>
      </Box>
      <Box sx={{ flex: 0.5, position: "relative" }}>
        {status === "PENDING" && (
          <>
            <Stack
              direction="row"
              gap={0.4}
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Pending
              </Typography>
              <KeyboardArrowDownIcon />
            </Stack>
            <Box>
              <Menu
                id="basic-menu"
                anchorEl={state.anchor}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleAccept}>Accept</MenuItem>
                <MenuItem onClick={handleReject}>Reject</MenuItem>
              </Menu>
            </Box>
          </>
        )}
        {status === "REJECTED" && (
          <>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                color: red[600],
              }}
            >
              Rejected
            </Typography>
          </>
        )}
        {status === "APPROVED" && (
          <>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 400,
                color: green[500],
              }}
            >
              Approved
            </Typography>
          </>
        )}
        {status === "NOT_APPROVED" && (
          <>
            <Typography
              onClick={() => handleReassignClick(workerId)}
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: blue[500],
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: blue[900],
                },
              }}
            >
              Reassign
            </Typography>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default BookingDetailTableItem;
