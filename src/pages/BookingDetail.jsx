import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackNavigate from "../components/BackNavigate";
import BookingDetailTableHeading from "../components/BookingDetailTableHeading";
import BookingDetailTableItem from "../components/BookingDetailTableItem";
import { clearmarkPaymentDone, markPaymentDone } from "../redux/commonReducer";
import {
  assignJob,
  clearAssignJob,
  clearJobRequest,
  getTimings,
  jobDetail,
  jobRequest,
} from "../redux/JobReducer";
import { PATH, THEME } from "../utils/constants";
import SmsIcon from "@mui/icons-material/Sms";
import moment from "moment";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
const ShowingData = ({ title, text }) => {
  return (
    <>
      <Grid item md={2} sx={{ mt: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: THEME.COLORS.text, fontSize: "17px" }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item md={4} sx={{ mt: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            color: THEME.COLORS.white,
            textOverflow: "ellipsis",
            wordWrap: "normal",
          }}
        >
          {text}
        </Typography>
      </Grid>
    </>
  );
};
const BookingDetail = () => {
  const { jobid } = useParams();
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD-TX4gvZRJfOFoYkFxAZccdc8YW3ZP_nM",
  });
  const [state, setState] = useState({
    anchor: null,
    id: "",
    paid: "",
    bookingid: "",
    show: false,
    trackJobDialog: false,
    showdialog: false,
  });
  const {
    jobDetail_isLoading,
    jobDetail_Data,
    jobDetail_isError,

    jobRequest_isLoading,
    jobRequest_Data,
    jobRequest_isError,

    assignJob_isLoading,
    assignJob_Data,
    assignJob_isError,

    getTimings_isLoading,
    getTimings_Data,
    getTimings_isError,
  } = useSelector((store) => store.jobStore);

  const {
    markPaymentDone_isLoading,
    markPaymentDone_Data,
    markPaymentDone_isError,
  } = useSelector((store) => store.commonStore);
  const navigate = useNavigate();
  const handleReject = () => {
    const body = {
      jobId: jobid,
      status: "REJECTED",
      bookingId: state.id,
    };
    dispatch(jobRequest(body));
    setState({ ...state, anchor: null, id: "" });
  };
  const handleAccept = () => {
    const body = {
      jobId: jobid,
      status: "APPROVED",
      bookingId: state.id,
    };
    dispatch(jobRequest(body));
    setState({ ...state, anchor: null, id: "" });
  };
  const handleReassignClick = (workerId) => {
    const body = {
      jobId: jobid,
      workerId: workerId,
    };
    dispatch(assignJob(body));
  };
  const handleMarkPaymentDone = () => {
    const body = {
      bookingId: state.bookingid,
      isPaidByAdmin: true,
    };
    dispatch(markPaymentDone(body));
  };
  useEffect(() => {
    if (assignJob_Data) {
      toast.success("Reassign Job updated");
      dispatch(jobDetail(jobid));
      dispatch(clearAssignJob());
    }
    if (assignJob_isError) {
      toast.error(
        assignJob_isError?.message
          ? assignJob_isError?.message
          : "something went wrong"
      );
      dispatch(clearAssignJob());
    }
  }, [assignJob_Data, assignJob_isError]);
  useEffect(() => {
    if (markPaymentDone_Data) {
      toast.success("Payment status updated");
      dispatch(jobDetail(jobid));
      dispatch(clearmarkPaymentDone());
    }
    if (markPaymentDone_isError) {
      toast.error("something went wrong");
      dispatch(clearmarkPaymentDone());
    }
  }, [markPaymentDone_Data, markPaymentDone_isError]);
  useEffect(() => {
    if (jobRequest_Data) {
      toast.success("Request Updated");
      dispatch(clearJobRequest());
      dispatch(jobDetail(jobid));
    }
    if (jobRequest_isError) {
      toast.error("something went wrong");
      dispatch(clearJobRequest());
    }
  }, [jobRequest_Data, jobRequest_isError]);
  useEffect(() => {
    if (jobDetail_Data) {
      const d = jobDetail_Data?.data[0]?.bookingDetails?.filter(
        (item) => item?.status === "COMPLETED"
      );
      if (d?.length > 0) {
        setState({
          ...state,
          show: true,
          paid: d[0]["isPaidByAdmin"],
          bookingid: d[0]["bookingId"],
        });
      }
    }
  }, [jobDetail_Data]);
  useEffect(() => {
    dispatch(jobDetail(jobid));
    dispatch(getTimings(jobid));
  }, []);
  useEffect(() => {
    return () => {
      setState({
        ...state,
        anchor: null,
        id: "",
        paid: "",
        bookingid: "",
        show: false,
      });
    };
  }, []);
  return (
    <>
      <Dialog
        open={state.showdialog}
        onClose={() => setState({ ...state, showdialog: false })}
        PaperProps={{
          sx: {
            minWidth: { xs: "95%", md: "60%" },
            height: "80vh",
          },
        }}
      >
        <Box sx={{ px: 2  }}>
          <Typography
            sx={{ textAlign: "center", mt: 2, mb: 0.5, fontWeight: 600}}
          >
            Work History
          </Typography>
          <Divider />
          {getTimings_Data?.data?.length > 0 ? (
            getTimings_Data?.data?.map((item, index) => (
              <Stack sx={{ my: 2 }} key={index} direction="row" gap={4}>
                <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
                  {index + 1}.
                </Typography>
                <Box>
                  <Stack direction="row" alignItems="center" gap={7}>
                    <Typography>Job Start Time</Typography>
                    <Typography>
                      {moment(item?.jobStartTime).format("llll")}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={7}
                    sx={{ mt: 0.5 }}
                  >
                    <Typography>Job End Time </Typography>
                    <Typography sx={{ ml: 1 }}>
                      {" "}
                      {moment(item?.jobEndTime).format("llll")}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            ))
          ) : (
            <Stack direction="row" justifyContent="center" sx={{ pt: 2 }}>
              <Typography sx={{ fontWeight: 500, color: "rgba(0,0,0,0.5)" }}>
                No Data Found
              </Typography>
            </Stack>
          )}
        </Box>
      </Dialog>
      <Dialog
        open={state.trackJobDialog}
        onClose={() => setState({ ...state, trackJobDialog: false })}
        PaperProps={{
          sx: {
            minWidth: { xs: "95%", md: "60%" },
            height: "80vh",
          },
        }}
      >
        {jobDetail_Data && isLoaded && (
          <GoogleMap
            center={{
              lat: jobDetail_Data?.data[0]?.location?.geo[0],
              lng: jobDetail_Data?.data[0]?.location?.geo[1],
            }}
            zoom={15}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >
            <Marker
              position={{
                lat: jobDetail_Data?.data[0]?.location?.geo[0],
                lng: jobDetail_Data?.data[0]?.location?.geo[1],
              }}
            />
          </GoogleMap>
        )}
      </Dialog>
      <BackNavigate />
      <Box
        sx={{
          backgroundColor: THEME.COLORS.backgroundPrimary,
          border: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0px 4px 6px rgba(62, 73, 84, 0.04)",
          borderRadius: "6px",
          py: 3,
          px: 5,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
         <Stack direction="row" gap={2} alignItems="center">
            <Typography sx={{ fontSize: "18px", fontWeight: 500,color:THEME.COLORS.text }}>
              Contractor Job Detail
            </Typography>
            <Button
              sx={{backgroundColor:THEME.COLORS.secondary,"&:hover": {
                backgroundColor: THEME.COLORS.secondary,
              },}}
              variant="contained"
              size="small"onClick={() =>
                navigate(
                  `${PATH.jobChat}/${jobid}/${jobDetail_Data?.data[0]?.contractorDetails?._id}`
                )
              }
            >
              <IconButton>
                <SmsIcon
                  sx={{ color: THEME.COLORS.white, cursor: "pointer" }}
                />
              </IconButton>
              Chat with contracter
            </Button>

            <Button
              sx={{backgroundColor:THEME.COLORS.secondary,"&:hover": {
                backgroundColor: THEME.COLORS.secondary,
              },}}
              variant="contained"
              size="small"
              onClick={() =>
                navigate(
                  `${PATH.jobChat}/${jobid}/${jobDetail_Data?.data[0]?.bookingDetails[0]?.workerDetails?._id}`
                )
              }
            >
              <IconButton>
                <SmsIcon
                  sx={{ color: THEME.COLORS.white, cursor: "pointer" }}
                />
              </IconButton>
              Chat with worker
            </Button>
          </Stack>
          {state.show && (
            <>
              {state.paid ? (
                <Button
                  
                  variant="contained"
                  sx={{
                    backgroundColor: THEME.COLORS.primary,
                    "&:hover": {
                      backgroundColor: THEME.COLORS.primary,
                    },
                  }}
                >
                  Paid
                </Button>
              ) : (
                <>
                  {markPaymentDone_isLoading ? (
                    <CircularProgress sx={{ color: THEME.COLORS.primary }} />
                  ) : (
                    <Button variant="contained" onClick={handleMarkPaymentDone}>
                      Pay to Worker
                    </Button>
                  )}
                </>
              )}
            </>
          )}
        </Stack>
        <Divider sx={{ my: 2 }} />
        {jobDetail_isLoading ? (
          <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
            <CircularProgress sx={{ color: THEME.COLORS.text }} size={40} />
          </Stack>
        ) : (
          jobDetail_Data?.data?.length > 0 && (
            <>
              <Grid container>
                <ShowingData
                  title="Name"
                  text={
                    jobDetail_Data?.data[0]?.contractorDetails?.firstName +
                    " " +
                    jobDetail_Data?.data[0]?.contractorDetails?.lastName
                  }
                />
                <ShowingData
                  title="Job Name"
                  text={jobDetail_Data?.data[0]?.jobName}
                />
                <ShowingData
                  title="Email"
                  text={jobDetail_Data?.data[0]?.contractorDetails?.email}
                />
                <ShowingData
                  title="Work Period"
                  text={`${moment(jobDetail_Data?.data[0]?.jobStartDate).format(
                    "ll"
                  )} - ${moment(jobDetail_Data?.data[0]?.jobEndDate).format(
                    "ll"
                  )}`}
                />
                <ShowingData
                  title="Work Timing"
                  text={`${moment(jobDetail_Data?.data[0]?.jobStartDate).format(
                    "LT"
                  )} - ${moment(jobDetail_Data?.data[0]?.jobEndDate).format(
                    "LT"
                  )}`}
                />
                <ShowingData
                  title="Notes"
                  text={jobDetail_Data?.data[0]?.notes}
                />
                <Grid md={2} sx={{ mt: 2 }}>
                  <Typography
                    sx={{ color: THEME.COLORS.text, fontSize: "17px" }}
                  >
                    Feedback
                  </Typography>
                </Grid>
                <Grid md={4} sx={{ mt: 2 }}>
                  <Rating
                    readOnly
                    value={jobDetail_Data?.data[0]?.feedbackDetails?.rating}
                  />
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 2 }}>
                <ShowingData
                  title={"Address Line 1"}
                  text={jobDetail_Data?.data[0]?.location?.streetAddress}
                />
                <ShowingData
                  title={"Address Line 2"}
                  text={jobDetail_Data?.data[0]?.location?.region}
                />
                <ShowingData
                  title={"City"}
                  text={jobDetail_Data?.data[0]?.location?.subLocality}
                />
                <ShowingData
                  title={"Province"}
                  text={jobDetail_Data?.data[0]?.location?.locality}
                />
                <ShowingData
                  title={"country"}
                  text={jobDetail_Data?.data[0]?.location?.country}
                />
                <ShowingData
                  title={"Postal Code"}
                  text={jobDetail_Data?.data[0]?.location?.postalCode}
                />
              </Grid>
              {/* <Stack
                direction="row"
                gap={13}
                alignItems="center"
                sx={{ mt: 5 }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
                  Job Location
                </Typography>

                <Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setState({ ...state, trackJobDialog: true })}
                  >
                    Show on Map
                  </Button>
                </Box>
              </Stack> */}

              <Stack
                direction="row"
                gap={13}
                alignItems="center"
                sx={{ mt: 5 }}
              >
                <Typography sx={{ fontSize: "18px", fontWeight: 500,color:THEME.COLORS.text }}>
                  Work History
                </Typography>

                <Box>
                    <Button
                      sx={{backgroundColor:THEME.COLORS.secondary,"&:hover": {
                        backgroundColor: THEME.COLORS.secondary,
                      },}}
                    variant="contained"
                    size="small"
                    onClick={() => setState({ ...state, showdialog: true })}
                  >
                    Show
                  </Button>
                </Box>
              </Stack>
              <Stack sx={{ flex: 1, my: 2 }}>
                <Stack sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: THEME.COLORS.text, fontSize: "20px" }}
                  >
                    Mandatory Items
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  flexWrap={"wrap"}
                  spacing={4}
                  sx={{ mt: 1 }}
                >
                  {jobDetail_Data?.data[0]?.mandatoryItems?.map(
                    (item, itemIndex) => (
                      <Stack direction="row" gap={1}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: THEME.COLORS.text,
                            fontSize: "16px",
                          }}
                          variant="subtitle1"
                        >
                          {itemIndex + 1}.
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: THEME.COLORS.white,
                            fontSize: "16px",
                          }}
                          variant="subtitle1"
                        >
                          {item}
                        </Typography>
                      </Stack>
                    )
                  )}
                </Stack>
              </Stack>
              <Stack direction="row" gap={5} sx={{ my: 5 }} alignItems="center">
                <Typography sx={{ fontSize: "18px", fontWeight: 500,color:THEME.COLORS.text }}>
                  Is Paid By Contractor
                </Typography>
                {jobDetail_Data?.data[0]?.isPaidByContractor ? (
                  <Button color="success" variant="contained" size="small">
                    Yes
                  </Button>
                ) : (
                  <Button color="error" variant="contained" size="small">
                    No
                  </Button>
                )}
              </Stack>
            </>
          )
        )}
      </Box>

      {jobDetail_Data?.data?.length > 0 && (
        <Box
          sx={{
            backgroundColor: THEME.COLORS.backgroundPrimary,
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0px 4px 6px rgba(62, 73, 84, 0.04)",
            borderRadius: "6px",
            py: 3,
            px: 5,
            mt: 2,
          }}
        >
          <Typography sx={{ mb: 2.5, fontSize: "18px", fontWeight: 500 ,color:THEME.COLORS.text}}>
            Worker Request
          </Typography>
          <BookingDetailTableHeading />
          <Divider sx={{ my: 2 }} />
          {jobDetail_isLoading || assignJob_isLoading ? (
            <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress
                sx={{ color: THEME.COLORS.text }}
                size={40}
              />
            </Stack>
          ) : !jobDetail_Data?.data[0]?.bookingDetails[0]?.workerDetails
              ?._id ? (
            <Stack direction="row" justifyContent="center" sx={{ my: 2,color: THEME.COLORS.text }}>
              <Typography>
                no workers available to this job right now.
              </Typography>
            </Stack>
          ) : jobDetail_isLoading || jobRequest_isLoading ? (
            <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress
                sx={{ color: THEME.COLORS.text }}
                size={40}
              />
            </Stack>
          ) : (
            jobDetail_Data?.data[0]?.bookingDetails?.map((item, itemIndex) => (
              <Box key={itemIndex} sx={{color: THEME.COLORS.text }} >
                <BookingDetailTableItem
                  handleReassignClick={handleReassignClick}
                  id={itemIndex + 1}
                  jobid={item?.bookingId}
                  status={item?.status}
                  workerId={item?.workerDetails?._id}
                  name={item?.workerDetails?.firstName}
                  email={item?.workerDetails?.email}
                  handleReject={handleReject}
                  handleAccept={handleAccept}
                  state={state}
                  setState={setState}
                />
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          )}
        </Box>
      )}
    </>
  );
};

export default memo(BookingDetail);
