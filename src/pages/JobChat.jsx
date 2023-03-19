import {
  Box,
  CircularProgress,
  IconButton,
  InputBase,
  Stack,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BackNavigate from "../components/BackNavigate";
import { useDispatch, useSelector } from "react-redux";
import { Download, Send } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import moment from "moment";
import { useParams } from "react-router-dom";
import { IMAGES, THEME } from "../utils/constants";
import { socket } from "../utils/socket";
import {
  clearUploadDocument,
  getJobChats,
  uploadDocument,
} from "../redux/commonReducer";
import { toast } from "react-toastify";
import { DownloadFile } from "../utils/Helper";

const LeftMessageCard = ({ text, img, time, imageType }) => {
  return (
    <Stack direction="row" flex={1} sx={{ mx: 1, my: 1 }}>
      <Stack direction="row" flex={0.45}>
        <Box
          sx={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            backgroundColor: THEME.COLORS.primary,
            mr: 0.5,
          }}
        ></Box>

        <Box
          sx={{
            flex: 1,
            py: 0.5,
            px: 0.7,
            backgroundColor: "rgba(142, 196, 71, 0.18)",
            borderRadius: "7px",
          }}
        >
          {img ? (
            imageType?.split("/")[0] === "image" ? (
              <img
                style={{ height: "150px", width: "100%", objectFit: "contain" }}
                src={img}
              />
            ) : imageType?.split("/")[0] === "video" ? (
              <video style={{ height: "120px", width: "100%" }} controls>
                <source src={img} type={imageType} />
              </video>
            ) : (
              imageType?.split("/")[0] === "application" && (
                <Stack direction="row" justifyContent="flex-start">
                  <Box>
                    <img
                      src={IMAGES.pdfImage}
                      style={{
                        height: "70px",
                        marginBottom: "-8px",
                        marginRight: "2px",
                      }}
                    />

                    <IconButton onClick={() => DownloadFile(img)}>
                      <Download sx={{ color: THEME.COLORS.primary }} />
                    </IconButton>
                  </Box>
                </Stack>
              )
            )
          ) : (
            <p style={{ fontSize: "14px" }}>{text}</p>
          )}
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{
              width: "100%",
            }}
          >
            <p style={{ color: THEME.COLORS.primary, fontSize: "12px" }}>
              {time}
            </p>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
const RightMessageCard = ({ text, img, time, imageType }) => {
  return (
    <Stack
      direction="row"
      flex={1}
      sx={{ mx: 1, my: 1 }}
      justifyContent="flex-end"
    >
      <Stack direction="row" flex={0.45} justifyContent="flex-start">
        <Box
          sx={{
            flex: 1,
            py: 0.5,
            px: 0.7,
            background: "#F6F6F6",
            borderRadius: "7px",
          }}
        >
          {img ? (
            imageType?.split("/")[0] === "image" ? (
              <Box
                sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: "5px" }}
              >
                <img
                  src={img}
                  style={{
                    height: "120px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <IconButton onClick={() => DownloadFile(img)}>
                  <Download sx={{ color: THEME.COLORS.primary }} />
                </IconButton>
              </Box>
            ) : imageType?.split("/")[0] === "video" ? (
              <video style={{ height: "120px", width: "100%" }} controls>
                <source src={img} type={imageType} />
              </video>
            ) : imageType?.split("/")[0] === "audio" ? (
              <audio controls>
                <source src={img} type={imageType} />
              </audio>
            ) : (
              imageType?.split("/")[0] === "application" && (
                <Stack direction="row" justifyContent="flex-end">
                  <Box>
                    <img
                      src={IMAGES.pdfImage}
                      style={{
                        height: "70px",
                        marginBottom: "-8px",
                        marginRight: "2px",
                      }}
                    />

                    <IconButton onClick={() => DownloadFile(img)}>
                      <Download sx={{ color: THEME.COLORS.primary }} />
                    </IconButton>
                  </Box>
                </Stack>
              )
            )
          ) : (
            <p style={{ fontSize: "14px" }}>{text}</p>
          )}
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{
              width: "100%",
            }}
          >
            <p style={{ color: THEME.COLORS.primary, fontSize: "12px" }}>
              {time}
            </p>
          </Stack>
        </Box>

        <Box
          sx={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            ml: 0.5,
            backgroundColor: THEME.COLORS.primary,
          }}
        ></Box>
      </Stack>
    </Stack>
  );
};
const JobChat = () => {
  const dispatch = useDispatch();
  const { jobid, contractorId } = useParams();
  const chatel = document.getElementById("chatbox");
  const {
    getJobChats_isLoading,
    getJobChats_Data,
    getJobChats_isError,

    getProfile_Data,

    uploadDocument_isLoading,
    uploadDocument_Data,
    uploadDocument_isError,
  } = useSelector((store) => store.commonStore);
  const [message, setMessage] = useState("");
  const [showData, setShowData] = useState([]);
  const [page, setPage] = useState(1);
  const [imagetype, setImageype] = useState("");

  const handleMoreChat = () => {
    if (Number(getJobChats_Data?.totalPage) > page) {
      setPage((prev) => prev + 1);
    }
  };
  const handleSubmit = (img, imagetype) => {
    if (message.trim() || img) {
      console.log("in submit");
      const body = {
        message,
        recipientId: contractorId,
        type: img ? "ATTACHMENT" : "SMS",
        senderId: getProfile_Data?.data?._id,
        jobId: jobid,
        createdAt: new Date(),
        directChat: false,
        attachment: {
          type: imagetype ? imagetype : "",
          value: img ? img : "",
        },
        senderDetails: {
          profile_pic: getProfile_Data?.data?.profile_pic,
          lastName: getProfile_Data?.data?.firstName,
          firstName: getProfile_Data?.data?.lastName,
        },
      };

      socket.emit("sendMessageEmit", body, (args) => {
        setShowData((prev) => [...prev, args]);
      });
      setMessage("");
    }
  };
  const onFileChange = (e) => {
    if (e.target.files[0]?.size < 50000000) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(uploadDocument(formData));
      setImageype(e.target.files[0]?.type);
    } else {
      toast.warning("File size more than 50 Mb");
    }
  };
  useEffect(() => {
    if (uploadDocument_Data) {
      handleSubmit(uploadDocument_Data?.data, imagetype);
      console.log(uploadDocument_Data?.data, imagetype);
      setImageype("");
      dispatch(clearUploadDocument());
    }
    if (uploadDocument_isError) {
      toast.error(
        uploadDocument_isError?.message
          ? uploadDocument_isError?.message
          : "something wrong"
      );
    }
  }, [uploadDocument_Data, uploadDocument_Data]);
  useEffect(() => {
    socket.emit("join", { userId: getProfile_Data?.data?._id }, (args) => {
      console.log(args);
    });
    socket.emit("job-join", {
      jobId: jobid,
      userId: getProfile_Data?.data?._id,
    });
  }, []);
  useEffect(() => {
    const body = {
      page: page,
      limit: 30,
      id: jobid,
      userId: contractorId,
    };
    dispatch(getJobChats(body));
  }, [page]);

  useEffect(() => {
    if (getJobChats_Data && getJobChats_Data?.data) {
      if (Number(getJobChats_Data?.currentPage) !== 1) {
        setShowData([...getJobChats_Data?.data, ...showData]);
      } else if (Number(getJobChats_Data?.currentPage) === 1) {
        setShowData(getJobChats_Data?.data);
      }
    }
  }, [getJobChats_Data]);

  useEffect(() => {
    if (showData.length > 0 && page === 1) {
      chatel.scrollTo({ top: chatel.scrollHeight, behavior: "smooth" });
    }
  }, [showData]);
  useEffect(() => {
    return () => {
      setShowData([]);
    };
  }, []);

  useEffect(() => {
    socket.off("sendMessageListen").on("sendMessageListen", (args) => {
      setShowData((prev) => [...prev, args]);
    });
    return () => socket.emit("end");
  }, []);
  return (
    <div style={{ position: "relative" }}>
      {/* message section */}
      <Grid container columnSpacing={1.5} sx={{ height: "100%", backgroundColor: THEME.COLORS.backgroundSecondary, padding: '10px'}}>
      <BackNavigate />
      <Box
        sx={{
          pb: 2,
          pt: 1,
          width: { md: "70%" },
          m: "auto",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          height: "80vh",
          backgroundColor: THEME.COLORS.backgroundPrimary,
          overflowY: "scroll",
        }}
        id="chatbox"
      >
        {getJobChats_isLoading && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
            <CircularProgress sx={{ color: THEME.COLORS.primary }} />
          </Stack>
        )}
        {!getJobChats_isLoading &&
          Number(getJobChats_Data?.totalPage) > page && (
            <Stack direction="row" justifyContent="center" sx={{ pt: 3 }}>
              <Box
                onClick={handleMoreChat}
                sx={{
                  backgroundColor: THEME.COLORS.backgroundPrimary,
                  py: 0.6,
                  px: 2,
                  borderRadius: "7px",
                  boxShadow: 1,
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.6,
                  },
                }}
              >
                <Typography>More Chats</Typography>
              </Box>
            </Stack>
          )}{" "}
        {showData?.map((item, itemIndex) => (
          <Box key={itemIndex}>
            {item?.senderId !== getProfile_Data?.data?._id ? (
              <LeftMessageCard
                text={item?.message}
                time={moment(item?.createdAt).format("hh:mm a")}
                img={item?.attachment?.value}
                imageType={item?.attachment?.type}
              />
            ) : (
              <RightMessageCard
                img={item?.attachment?.value}
                imageType={item?.attachment?.type}
                text={item?.message}
                time={moment(item?.createdAt).format("hh:mm a")}
              />
            )}
          </Box>
        ))}
        <Box sx={{ backgroundColor: "#f1f1f1" }}></Box>
      </Box>
      {/* Bottom Input stuff */}
      {uploadDocument_isLoading ? (
        <Stack direction="row" justifyContent="center">
          <CircularProgress sx={{ color: THEME.COLORS.primary }} />
        </Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: { md: "70%" },
            m: "auto",

            backgroundColor: "rgba(142, 196, 71, 0.3)",
            borderRadius: "8px",
            py: 1,
            px: 2,
          }}
        >
          <InputBase
            fullWidth
            placeholder="message..."
            value={message}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Stack direction="row" gap={1.6}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                p: 0.5,
              }}
            >
              <input
                hidden
                accept="image/*,video/*,application/*,audio/*"
                type="file"
                onChange={onFileChange}
              />
              <AttachFileIcon
                sx={{
                  color: "#B4B4B4",
                  transform: "rotate(30deg)",
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Box
              sx={{
                backgroundColor: THEME.COLORS.primary,
                p: 0.5,
                pb: 0.7,
                borderRadius: "7px",
              }}
              onClick={() => handleSubmit()}
            >
              <Send
                sx={{
                  color: "#fff",
                  mb: "-3px",
                  ml: "3px",
                  transform: "rotate(-40deg)",
                }}
              />
            </Box>
          </Stack>
        </Stack>
        )}
        </Grid>
    </div>
  );
};

export default JobChat;
