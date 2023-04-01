import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../redux/commonReducer";
import { IMAGES, PATH, THEME } from "../utils/constants";
import moment from "moment";
import { CustomPagination } from "../components/styledComponent";
import { socket } from "../utils/socket";
import { Link, useNavigate } from "react-router-dom";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const Notifications = () => {
  const [state, setState] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getNotification_isLoading,
    getNotification_Data,
    getNotification_isError,
  } = useSelector((store) => store.commonStore);
  const handleClick = (id) => {
    // navigate(`${PATH.BookingDetail}/${id}`);
  };
  useEffect(() => {
    const body = {
      page: state,
      limit: 10,
    };
    dispatch(getNotification(body));
  }, [state]);
  return (
    <div>
      <Box
        sx={{
          backgroundColor: THEME.COLORS.backgroundPrimary,
          px: 2,
          py: 1,
          pb: 2,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          minHeight: "70vh",
          m: 2,
        }}
      >
        <Typography sx={{ mb: 3, fontSize: "18px", fontWeight: 500, color: THEME.COLORS.text }}>
          Notifications
        </Typography>
        {getNotification_isLoading ? (
          <Stack direction="row" justifyContent="center">
            <CircularProgress sx={{ color: THEME.COLORS.primary }} />
          </Stack>
        ) : (
          <Grid container spacing={2} sx={{ px: 3 }}>
            {getNotification_Data?.data?.map((item, itemIndex) => (
              <Grid item xs={6} key={itemIndex}>
                <Link
                  to={`${PATH.BookingDetail}/${item?.payload?.jobId}`}
                  onClick={() => handleClick(item?.payload?.jobId)}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    gap={3}
                    sx={{
                      background: THEME.COLORS.secondary,
                      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "7px",
                      py: 1,
                      px: 2,
                      cursor: "pointer",
                    }}
                  >
                    <Stack direction="row" gap={3}>
                      <Stack
                        sx={{
                          height: "42px",
                          width: "42px",
                          borderRadius: "9px",
                          backgroundColor: THEME.COLORS.primary,
                        }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <img src={IMAGES.notiIcon} />
                      </Stack>
                      <Box>
                        <Typography sx={{ color: THEME.COLORS.text, fontSize: "16px" }}>
                          {item?.title}
                        </Typography>
                        <Typography sx={{ color: "#C8C8C8", fontSize: "14px" }}>
                          {item?.body}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="column" justifyContent="space-between">
                      <Typography sx={{ color: "#C8C8C8", fontSize: "14px" }}>
                        {moment(item?.createdAt).fromNow()}
                      </Typography>
                      <Stack direction="row" justifyContent="flex-end">
                        {item?.isRead ? (
                          <DoneAllIcon
                            sx={{
                              color: THEME.COLORS.primary,
                              fontSize: "18px",
                            }}
                          />
                        ) : (
                          <DoneAllIcon
                            sx={{
                              color: "rgba(0,0,0,0.4)",
                              fontSize: "18px",
                            }}
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getNotification_Data?.totalPage}
          defaultPage={state}
          shape="rounded"
          variant="outlined"
          onChange={(e, value) => setState(value)}
        />
      </Stack>
    </div>
  );
};

export default memo(Notifications);
