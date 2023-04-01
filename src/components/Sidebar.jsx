import { Box, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PATH, THEME } from "../utils/constants";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ReviewsIcon from "@mui/icons-material/Reviews";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PaymentIcon from "@mui/icons-material/Payment";
import PaymentsIcon from "@mui/icons-material/Payments";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CategoryIcon from "@mui/icons-material/Category";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/AuthReducer";
import EngineeringIcon from "@mui/icons-material/Engineering";
// import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const CustomLink = ({ path, active, name, icon }) => {

  return (
    <Link to={path}>
      <Stack
        direction="row"
        gap={1}
        sx={{
          py: 1.3,
          px: 3,
          backgroundColor: active ? THEME.COLORS.secondary : THEME.COLORS.backgroundPrimary,
          color: THEME.COLORS.white,
          borderWidth: 1,
          borderBottomStyle: 'solid',
          borderBottomColor: '#333 !important',
          ":hover": {
            backgroundColor: active ? THEME.COLORS.secondary : THEME.COLORS.primary,
            color: THEME.COLORS.white
          }
        }}
      >
        {icon}
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
};
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };


  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (
    <>
      <AlertDialogSlide open={open} handleAction={handleLogout} handleClose={handleClose} />
      {width > 768 && <Box
        sx={{
          backgroundColor: THEME.COLORS.backgroundPrimary,
          height: "100%",
        }}
      >
        <CustomLink
          path={PATH.Dashboard}
          active={
            PATH.Dashboard === location.pathname ||
              location.pathname.includes(PATH.Profile)
              ? true
              : false
          }
          name={"Dashboard"}
          icon={<DashboardIcon />}
        />
        <CustomLink
          path={PATH.Contractor}
          active={
            PATH.Contractor === location.pathname ||
              location.pathname.includes(PATH.ContractorDetail)
              ? true
              : false
          }
          name={"Contractor"}
          icon={<SupervisorAccountIcon />}
        />
        <CustomLink
          path={PATH.Worker}
          active={
            PATH.Worker === location.pathname ||
              location.pathname.includes(PATH.WorkerDetail)
              ? true
              : false
          }
          name={"Workers"}
          icon={<MiscellaneousServicesIcon />}
        />
        <CustomLink
          path={PATH.Bookings}
          active={
            PATH.Bookings === location.pathname ||
              location.pathname.includes(PATH.BookingDetail)
              ? true
              : false
          }
          name={"Contractor Jobs"}
          icon={<CalendarMonthIcon />}
        />
        <CustomLink
          path={PATH.ActiveWorker}
          active={PATH.ActiveWorker === location.pathname ? true : false}
          name={"Active Workers"}
          icon={<EngineeringIcon />}
        />
        <CustomLink
          path={PATH.Category}
          active={PATH.Category === location.pathname ? true : false}
          name={"Categories"}
          icon={<CategoryIcon />}
        />
        <CustomLink
          path={PATH.Chat}
          active={
            PATH.Chat === location.pathname ||
              location.pathname.includes(PATH.jobChat)
              ? true
              : false
          }
          name={"Chats"}
          icon={<ChatBubbleIcon />}
        />

        <CustomLink
          path={PATH.Notification}
          active={PATH.Notification === location.pathname ? true : false}
          name={"Notifications"}
          icon={<NotificationsActiveIcon />}
        />

        <CustomLink
          path={PATH.AddPaymentInfo}
          active={PATH.AddPaymentInfo === location.pathname ? true : false}
          name={"Add Payment Info"}
          icon={<PaymentsIcon />}
        />
        <CustomLink
          path={PATH.PaymentDetail}
          active={PATH.PaymentDetail === location.pathname ? true : false}
          name={"Payment detail"}
          icon={<PaymentsIcon />}
        />
        <CustomLink
          path={PATH.TermCond}
          active={PATH.TermCond === location.pathname ? true : false}
          name={"Term & Condition"}
          icon={<MenuBookIcon />}
        />
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          onClick={handleClickOpen}
          sx={{
            px: 3,
            py: 1.3,
            bakckgroundColor: "#fff",
            cursor: "pointer",
            ":hover": {
              backgroundColor: THEME.COLORS.primary,
              color: THEME.COLORS.white
            }
          }}
        >
          <Logout sx={{
            mb: "-5px",
            color: "#fff"
          }} />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              color: "#fff"
            }}
          >
            Logout
          </Typography>
        </Stack>
      </Box>

      }
    </>
  );
};

export default Sidebar;

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
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        {/* <DialogContent> */}
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleAction}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
