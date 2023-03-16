import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { IMAGES, PATH, THEME } from "../utils/constants";
import { workerTAble } from "../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { clearWorkeDetail, workerDetailById } from "../redux/WorkerReducer";
import { clearUpdateuser, updateUser } from "../redux/commonReducer";
import { toast } from "react-toastify";
import BackNavigate from "../components/BackNavigate";
import Lightbox from "react-18-image-lightbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SmsIcon from "@mui/icons-material/Sms";
const WorkerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workerDetail_isLoading, workerDetail_Data, workerDetail_isError } =
    useSelector((store) => store.workerStore);
  const {
    updateUser_isLoading,
    updateUser_Data,
    updateUser_isError,

    markPaymentDone_isLoading,
    markPaymentDone_Data,
    markPaymentDone_isError,
  } = useSelector((store) => store.commonStore);
  const [state, setState] = useState({
    isOpen: false,
    photoIndex: 0,
    isOpen1: false,
    photoIndex1: 0,
    images: [],
    images1: [],
  });
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  const handleApprove = () => {
    const body = {
      userId: id,
      isDocumentApproved: "APPROVED",
    };
    dispatch(updateUser(body));
  };
  const handleRejected = () => {
    const body = {
      userId: id,
      isDocumentApproved: "REJECTED",
    };
    dispatch(updateUser(body));
  };
  useEffect(() => {
    let img = [];
    let img1 = [];
    if (workerDetail_Data?.data?.documents?.length > 0) {
      workerDetail_Data?.data?.documents?.forEach((item) => {
        img.push(item?.link);
      });
    }
    if (workerDetail_Data?.data?.license?.length > 0) {
      workerDetail_Data?.data?.license?.forEach((item) => {
        img1.push(item?.link);
      });
    }
    setState({ ...state, images: img, images1: img1 });
  }, [workerDetail_Data]);
  useEffect(() => {
    if (updateUser_Data) {
      toast.success("user updated");
      dispatch(clearUpdateuser());
      dispatch(workerDetailById(id));
    }
    if (updateUser_isError) {
      toast.error("something went wrong");
      dispatch(clearUpdateuser());
    }
  }, [updateUser_Data]);
  useEffect(() => {
    dispatch(workerDetailById(id));
    return () => {
      dispatch(clearWorkeDetail());
    };
  }, []);

  return (
    <>
      {state.isOpen && (
        <Box sx={{ zIndex: 500000 }}>
          <Lightbox
            mainSrc={state.images[state.photoIndex]}
            nextSrc={state.images[(state.photoIndex + 1) % state.images.length]}
            prevSrc={
              state.images[
                (state.photoIndex + state.images.length - 1) %
                  state.images.length
              ]
            }
            onCloseRequest={() => setState({ ...state, isOpen: false })}
            onMovePrevRequest={() =>
              setState({
                ...state,
                photoIndex:
                  (state.photoIndex + state.images.length - 1) %
                  state.images.length,
              })
            }
            onMoveNextRequest={() =>
              setState({
                ...state,
                photoIndex: (state.photoIndex + 1) % state.images.length,
              })
            }
          />
        </Box>
      )}

      {state.isOpen1 && (
        <Box sx={{ zIndex: 500000 }}>
          <Lightbox
            mainSrc={state.images1[state.photoIndex1]}
            nextSrc={
              state.images1[(state.photoIndex1 + 1) % state.images1.length]
            }
            prevSrc={
              state.images1[
                (state.photoIndex1 + state.images1.length - 1) %
                  state.images1.length
              ]
            }
            onCloseRequest={() => setState({ ...state, isOpen1: false })}
            onMovePrevRequest={() =>
              setState({
                ...state,
                photoIndex1:
                  (state.photoIndex1 + state.images1.length - 1) %
                  state.images1.length,
              })
            }
            onMoveNextRequest={() =>
              setState({
                ...state,
                photoIndex1: (state.photoIndex1 + 1) % state.images1.length,
              })
            }
          />
        </Box>
      )}
      <BackNavigate />
      {workerDetail_isLoading ? (
        <Stack direction="row" justifyContent="center">
          <CircularProgress sx={{ color: THEME.COLORS.primary }} />
        </Stack>
      ) : (
        <Box
          sx={{
            backgroundColor: "#0F1C24",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0px 4px 6px rgba(62, 73, 84, 0.04)",
            borderRadius: "6px",
            py: 3,
            px: 5,
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <Typography sx={{ fontSize: "18px", fontWeight: 500 ,color:THEME.COLORS.text }}>
              Worker Details
            </Typography>
            <IconButton
              onClick={() => navigate(`${PATH.Chat}?id=${id}&role=WORKER`)}
            >
              <SmsIcon
                sx={{ color: THEME.COLORS.secondary, cursor: "pointer" }}
              />
            </IconButton>
          </Stack>

          <Divider sx={{ my: 2 ,borderBottomColor:"#333"}} />

          <Stack direction="row" sx={{ my: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Name
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.firstName}{" "}
                  {workerDetail_Data?.data?.lastName}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.email}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Phone
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  +1 {workerDetail_Data?.data?.phoneNumber}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  City
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.address?.subLocality}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Country
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.address?.country}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Street Address
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.address?.streetAddress}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Province
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.address?.locality}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Postal Code
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.address?.postalCode}
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
              {workerDetail_Data?.data?.categories?.map((res, resIndex) => (
                <Box key={resIndex}>
                  <Stack
                    direction="row"
                    sx={{ flex: 1, my: 1 }}
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: THEME.COLORS.text,
                        fontSize: "20px",
                        flex: 1,
                      }}
                    >
                      Category
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: THEME.COLORS.white,
                        flex: 1,
                        fontWeight: 500,
                      }}
                    >
                      {res?.categoryName}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    sx={{ flex: 1, my: 1 }}
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: THEME.COLORS.text,
                        fontSize: "20px",
                        flex: 1,
                      }}
                    >
                      Experience
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: THEME.COLORS.white,
                        flex: 1,
                        fontWeight: 500,
                      }}
                    >
                      {res?.experience ? res?.experience : 0}
                    </Typography>
                  </Stack>
                  <Divider sx={{borderBottomColor:"#333"}} />
                </Box>
              ))}
              <Typography variant="h6" sx={{color:THEME.COLORS.text}}>Payment Details</Typography>
              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Institute Name
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.paymentDetails?.instituteName}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Account Number
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.paymentDetails?.accountNumber}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                sx={{ flex: 1, my: 1 }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Transit Number
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: THEME.COLORS.white, flex: 1, fontWeight: 500 }}
                >
                  {workerDetail_Data?.data?.paymentDetails?.transitNumber}
                </Typography>
              </Stack>

              <Stack sx={{ flex: 1, my: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                  }}
                >
                  Account Image
                </Typography>
                {workerDetail_Data?.data?.paymentDetails?.image ? (
                  <img
                    alt="document"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                      width: "300px",
                      color:THEME.COLORS.white
                    }}
                    src={workerDetail_Data?.data?.paymentDetails?.image}
                  />
                ) : null}
              </Stack>
            </Box>
          </Stack>
          {updateUser_isLoading ? (
            <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
              <CircularProgress sx={{ color: THEME.COLORS.primary }} />
            </Stack>
          ) : (
            <>
              <Stack alignItems={"end"} gap={3} >
                
                <Stack gap={2} direction="row" >
                  {workerDetail_Data?.data?.isDocumentApproved !==
                    "PENDING" && (
                    <>
                      {workerDetail_Data?.data?.isDocumentApproved ===
                      "APPROVED" ? (
                        <Stack direction="row" gap={0.5}>
                          <CheckCircleOutlineIcon
                            sx={{
                              color: THEME.COLORS.green,
                              fontWeight: 700,
                            }}
                          />
                          <Typography
                            sx={{
                              color: THEME.COLORS.white,
                              fontWeight: 700,
                            }}
                          >
                            Document Verified
                          </Typography>
                        </Stack>
                      ) : (
                        <Box>
                          <Button
                            onClick={handleApprove}
                            sx={{
                              backgroundColor: THEME.COLORS.primary,
                              "&:hover": {
                                backgroundColor: THEME.COLORS.primary,
                              },
                            }}
                            size="small"
                            variant="contained"
                          >
                            verify
                          </Button>
                        </Box>
                      )}
                      {workerDetail_Data?.data?.isDocumentApproved ===
                      "REJECTED" ? (
                        <Stack direction="row" gap={0.5}>
                          <HighlightOffIcon
                            color="error"
                            sx={{ fontWeight: 700 }}
                          />
                          <Typography color="error" sx={{ fontWeight: 700 }}>
                            Document Rejected
                          </Typography>
                        </Stack>
                      ) : (
                        <Box>
                          <Button
                            onClick={handleRejected}
                            color="error"
                            size="small"
                            variant="contained"
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </>
                  )}

                  {workerDetail_Data?.data?.isDocumentApproved ===
                    "PENDING" && (
                    <Stack direction="row" gap={2}>
                      <Box>
                        <Button
                          onClick={handleApprove}
                          sx={{
                            backgroundColor: THEME.COLORS.primary,
                            "&:hover": {
                              backgroundColor: THEME.COLORS.primary,
                            },
                          }}
                          size="small"
                          variant="contained"
                        >
                          verify
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          onClick={handleRejected}
                          color="error"
                          size="small"
                          variant="contained"
                        >
                          Reject
                        </Button>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              {/* license Document */}

              <Grid spacing={3} container>
                {workerDetail_Data?.data?.license?.map((res, resIndex) => (
                  <Grid sx={{ width: "200px" }} item xs={4}>
                    <img
                      style={{
                        height: "150px",
                        objectFit: "contain",
                        cursor: "zoom-in",
                        color: "#333"
                      }}
                      src={res?.link ? res.link : IMAGES.placeholderImage}
                      alt="document"
                      onClick={() => {
                        state["photoIndex1"] = resIndex;
                        setState({
                          ...state,
                          isOpen1: true,
                        });
                      }}
                    />
                    <Typography sx={{ color: "#000" }}>{res?.name}</Typography>
                  </Grid>
                ))}
              </Grid>
              {/* other Document */}
              <Box sx={{ flex: 1, my: 5 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: THEME.COLORS.text,
                    fontSize: "20px",
                    flex: 1,
                    mb: 2,
                  }}
                >
                  Legal Status Document in Canada
                </Typography>
                <Grid spacing={3} container>
                  {workerDetail_Data?.data?.documents?.map((res, resIndex) => (
                    <Grid sx={{ width: "200px" }} item xs={4}>
                      {isValidHttpUrl(res.link) &&
                        <img
                          style={{
                            height: "150px",
                            objectFit: "contain",
                            cursor: "zoom-in",
                          }}
                          src={res?.link ? res.link : IMAGES.placeholderImage}
                          alt="document"
                          onClick={() => {
                            state["photoIndex"] = resIndex;
                            setState({
                              ...state,
                              isOpen: true,
                            });
                          }}
                        />
                      }
                      <Typography sx={{ color: THEME.COLORS.text }}>
                        {res?.name} {!isValidHttpUrl(res.link) && `- ${res.link}`}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default memo(WorkerDetail);
