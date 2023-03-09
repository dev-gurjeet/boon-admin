import { Badge, Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification, getProfile } from "../redux/commonReducer";
import { IMAGES, PATH, THEME } from "../utils/constants";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import audioFile from "../assets/sound/cute_notification.mp3";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const audio = new Audio(audioFile);
  const { getProfile_Data, getNotification_Data } = useSelector(
    (store) => store.commonStore
  );
  const playAudio = async () => {
    await audio.play();
  };
  useEffect(() => {
    socket
      .off("unreadNotificationsEmit")
      .on("unreadNotificationsEmit", (args) => {
        if (args > 0) {
          toast.success("New Notification");
          playAudio();
        }
        setState(args);
      });
    socket
      .off("sendUnreadNotificationCount")
      .on("sendUnreadNotificationCount", (args) => {
        console.log(args, "in second argsss");
        toast.success("New Notification");
        playAudio();
        setState(args);
      });
    return () => socket.emit("end");
  }, []);

  useEffect(() => {
    socket.emit("unreadNotifications");
  }, []);
  useEffect(() => {
    if (getProfile_Data?.data) {
      socket.emit("join", { userId: getProfile_Data?.data?._id }, (args) => {
        console.log(args, "in join ");
      });
    }
  }, [getProfile_Data?.data]);
  useEffect(() => {
    dispatch(getProfile());
    const body = {
      page: 1,
      limit: 10,
    };
    dispatch(getNotification(body));
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        height: "10vh",
        position: "fixed",
        top: 0,
        zIndex: 500,
        width: "100%",
        backgroundColor: THEME.COLORS.white,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
        px: "5%",
      }}
    >
      <Box>
        <img
          alt="logo"
          src={IMAGES.logo}
          style={{
            height: "auto",
            width: "150px",
            objectFit: "contain",
          }}
        />
      </Box>

      <Stack direction="row" alignItems="center" gap={5}>
        <Link to={PATH.Notification}>
          <Badge
            color="error"
            badgeContent={state}
            // onClick={() => navigate(PATH.Notification)}
          >
            <NotificationsIcon
              sx={{ color: "rgba(0,0,0,0.6)", fontSize: "1.8rem" }}
            />
          </Badge>
        </Link>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          onClick={() => navigate(PATH.Profile)}
          sx={{ cursor: "pointer" }}
        >
          <PersonIcon sx={{ color: THEME.COLORS.primary, fontSize: "2rem" }} />
          <Box>
            <p style={{ fontWeight: 500, fontSize: "18px" }}>
              {getProfile_Data?.data?.firstName}{" "}
              {getProfile_Data?.data?.lastName}
            </p>
            {/* <p style={{ textAlign: "end", marginTop: "-3px" }}>Admin</p> */}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
