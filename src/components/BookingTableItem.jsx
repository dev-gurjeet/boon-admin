import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { blue } from "@mui/material/colors";
import { PATH } from "../utils/constants";
import { useNavigate } from "react-router-dom";
const textCss = {
  color: "#202020",

  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "14px",
};
const textCsswithDeco = {
  color: "#202020",

  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
  fontSize: "14px",
  textDecoration: "underline",
  color: blue[500],
  cursor: "pointer",
  "&:hover": {
    color: blue[900],
  },
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const BookingTableItem = ({
  id,
  price,
  phone,
  address,
  jobid,
  company,
  status,
  state,
  setState,
  handleRejected,
  modifiedPrice,
  adminCommision,
}) => {
  const navigate = useNavigate();
  const open = Boolean(state.anchor);
  const handleClick = (event) => {
    setState({
      ...state,
      anchor: event.currentTarget,
      id: jobid,
      originalPrice: price,
    });
  };
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };
  const handleCloseModify = () => {
    setState({ ...state, anchor: null, dialog: true });
  };
  return (
    <Stack direction="row" alignItems="center">
      {/* <Box sx={{ flex: 0.2 }}>
        <Typography style={textCss}>#{id}</Typography>
      </Box> */}
      <Stack sx={{ flex: 0.5 }} direction="row" alignItems="center" gap={0.7}>
        <Typography
          sx={textCsswithDeco}
          onClick={() => navigate(`${PATH.BookingDetail}/${jobid}`)}
        >
          #{jobid?.slice(0, 6)}
        </Typography>
      </Stack>
      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{company}</Typography>
      </Box>
      <Box sx={{ flex: 0.4 }}>
        <Typography style={textCss}>${price}</Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography style={textCss}>{address}</Typography>
      </Box>
      <Box sx={{ flex: 0.5 }}>
        <Typography style={textCss}>
          ${modifiedPrice ? modifiedPrice : 0}
        </Typography>
      </Box>
      <Box sx={{ flex: 0.7 }}>
        <Typography style={textCss}>
          ${Number(adminCommision ? adminCommision : 0)}
        </Typography>
      </Box>
      <Box sx={{ flex: 0.4 }}>
        {status === "APPROVED" && (
          <Typography
            sx={{
              color: "#0CCF2B",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Approved
          </Typography>
        )}
        {status === "COMPLETED" && (
          <Typography
            sx={{
              color: "#0CCF2B",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Completed
          </Typography>
        )}
        {status === "IN_PROGRESS" && (
          <Typography
            sx={{
              color: "primary.main",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            In Progress
          </Typography>
        )}
        {status === "CANCELLED" && (
          <Typography
            sx={{
              color: "#FF4545",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Cancelled
          </Typography>
        )}
        {status === "REJECTED" && (
          <Typography
            sx={{
              color: "#FF4545",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Rejected
          </Typography>
        )}

        {modifiedPrice && status === "PENDING" && (
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Modified
          </Typography>
        )}
        {status === "PENDING" && !modifiedPrice && (
          <>
            <Stack
              direction="row"
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
                {/* <MenuItem onClick={handleClose}>Accept</MenuItem> */}
                <MenuItem onClick={handleRejected}>Reject</MenuItem>
                <MenuItem onClick={handleCloseModify}>Modify</MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default BookingTableItem;
