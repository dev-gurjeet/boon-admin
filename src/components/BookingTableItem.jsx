import { Box, Menu, MenuItem, Stack, Typography, styled, Button } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { blue } from "@mui/material/colors";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PATH, THEME } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { StackedLineChartOutlined } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
const textCss = {
  color: THEME.COLORS.text,

  fontWeight: 400,
  letterSpacing: "1px",
  textTransform: "capitalize",
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
    color: THEME.COLORS.secondary,
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
  handleCanceled,
  modifiedPrice,
  adminCommision,
  deleteJob
}) => {
  const navigate = useNavigate();
  // const open = Boolean(state.anchor);
  const [openModal, setOpenModal] = useState(false)
  const handleDeleteModal = () => {
    console.log("here");
    setOpenModal(true)
  }
  const handleDeleteJob = (jobid) => {
    deleteJob(jobid);
    handleCloseModal();
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }
  const handleClick = (event) => {
    setState({
      ...state,
      anchor: event.currentTarget,
      id: jobid,
      originalPrice: price,
    });
  };
  const [statusVal, setStatusVal] = useState("")
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };
  const handleCloseModify = () => {
    setState({
      ...state, dialog: true, id: jobid,
      originalPrice: price,
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      borderColor: "#333 !important",
      color: THEME.COLORS.text
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: THEME.COLORS.backgroundSecondary,
    },
    '&:nth-of-type(even)': {
      backgroundColor: THEME.COLORS.backgroundPrimary,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack sx={{ flex: 0.5 }} direction="row" alignItems="center" gap={0.7}>
          <Typography
            sx={textCsswithDeco}
            onClick={() => navigate(`${PATH.BookingDetail}/${jobid}`)}
          >
            #{jobid?.slice(0, 6)}
          </Typography>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="right"><Typography style={textCss}>{company}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography style={textCss}>${price}</Typography></StyledTableCell>
      <StyledTableCell align="center">
        <Typography style={textCss}>{address}</Typography></StyledTableCell>
      <StyledTableCell align="center">  <Typography style={textCss}>
        ${modifiedPrice ? modifiedPrice : 0}
      </Typography></StyledTableCell>
      <StyledTableCell align="center">
        <Typography style={textCss}>
          ${Number(adminCommision ? adminCommision : 0)}
        </Typography></StyledTableCell>
      <StyledTableCell align="center">
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
              color: 'orange',
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Modified
          </Typography>
        )}
        {status === "PENDING" && !modifiedPrice && (
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label" sx={{ color: THEME.COLORS.text }}>Pending</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Pending"
              value={statusVal}
              onChange={(e) => {
                setStatusVal(e.target.value);
                handleClick(e)
                if (e.target.value == "Reject") {
                  handleRejected(jobid)
                }
                else if (e.target.value == "Modify") {
                  handleCloseModify()
                }
                else if (e.target.value == "Cancel") {
                  handleCanceled(jobid)
                }
              }}
            >
              <MenuItem value={"Reject"}>Reject</MenuItem>
              <MenuItem value={"Modify"}>Modify</MenuItem>
              <MenuItem value={"Cancel"}>Cancel</MenuItem>
            </Select>
          </FormControl>)
        }
      </StyledTableCell>
      <StyledTableCell align="center">
        <Stack className={`${status !== "APPROVED" && status !== "PENDING" && 'btn-disabled'}`}>
          <Button variant="contained" color="error" onClick={handleDeleteModal}>Delete</Button>

          <AlertDialogSlide open={openModal} handleAction={() => handleDeleteJob(jobid)} handleClose={handleCloseModal} />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  )
  // return (
  //   <Stack direction="row" alignItems="center">
  //     {/* <Box sx={{ flex: 0.2 }}>
  //       <Typography style={textCss}>#{id}</Typography>
  //     </Box> */}
  //     <Stack sx={{ flex: 0.5 }} direction="row" alignItems="center" gap={0.7}>
  //       <Typography
  //         sx={textCsswithDeco}
  //         onClick={() => navigate(`${PATH.BookingDetail}/${jobid}`)}
  //       >
  //         #{jobid?.slice(0, 6)}
  //       </Typography>
  //     </Stack>
  //     <Box sx={{ flex: 1 }}>
  //       <Typography style={textCss}>{company}</Typography>
  //     </Box>
  //     <Box sx={{ flex: 0.4 }}>
  //       <Typography style={textCss}>${price}</Typography>
  //     </Box>
  //     <Box sx={{ flex: 1 }}>
  //       <Typography style={textCss}>{address}</Typography>
  //     </Box>
  //     <Box sx={{ flex: 0.5 }}>
  //       <Typography style={textCss}>
  //         ${modifiedPrice ? modifiedPrice : 0}
  //       </Typography>
  //     </Box>
  //     <Box sx={{ flex: 0.7 }}>
  //       <Typography style={textCss}>
  //         ${Number(adminCommision ? adminCommision : 0)}
  //       </Typography>
  //     </Box>
  //     <Box sx={{ flex: 0.4 }}>
  //       {status === "APPROVED" && (
  //         <Typography
  //           sx={{
  //             color: "#0CCF2B",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           Approved
  //         </Typography>
  //       )}
  //       {status === "COMPLETED" && (
  //         <Typography
  //           sx={{
  //             color: "#0CCF2B",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           Completed
  //         </Typography>
  //       )}
  //       {status === "IN_PROGRESS" && (
  //         <Typography
  //           sx={{
  //             color: "primary.main",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           In Progress
  //         </Typography>
  //       )}
  //       {status === "CANCELLED" && (
  //         <Typography
  //           sx={{
  //             color: "#FF4545",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           Cancelled
  //         </Typography>
  //       )}
  //       {status === "REJECTED" && (
  //         <Typography
  //           sx={{
  //             color: "#FF4545",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           Rejected
  //         </Typography>
  //       )}

  //       {modifiedPrice && status === "PENDING" && (
  //         <Typography
  //           sx={{
  //             color: "#000",
  //             fontFamily: "Roboto",
  //             fontSize: "16px",
  //             fontWeight: 400,
  //           }}
  //         >
  //           Modified
  //         </Typography>
  //       )}
  //       {status === "PENDING" && !modifiedPrice && (
  //         <>
  //           <Stack
  //             direction="row"
  //             onClick={handleClick}
  //             sx={{ cursor: "pointer" }}
  //           >
  //             <Typography
  //               sx={{
  //                 color: "#000",
  //                 fontFamily: "Roboto",
  //                 fontSize: "16px",
  //                 fontWeight: 400,
  //               }}
  //             >
  //               Pending
  //             </Typography>
  //             <KeyboardArrowDownIcon />
  //           </Stack>
  //           <Box>
  //             <Menu
  //               id="basic-menu"
  //               anchorEl={state.anchor}
  //               open={open}
  //               onClose={handleClose}
  //               MenuListProps={{
  //                 "aria-labelledby": "basic-button",
  //               }}
  //             >
  //               {/* <MenuItem onClick={handleClose}>Accept</MenuItem> */}
  //               <MenuItem onClick={handleRejected}>Reject</MenuItem>
  //               <MenuItem onClick={handleCloseModify}>Modify</MenuItem>
  //             </Menu>
  //           </Box>
  //         </>
  //       )}
  //     </Box>
  //   </Stack>
  // );
};

export default BookingTableItem;



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function AlertDialogSlide({ open, handleClose, handleAction }) {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to Delete?</DialogTitle>
        {/* <DialogContent> */}
        {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleAction}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
