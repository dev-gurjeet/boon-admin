import {
  Stack,
  Box,
  Typography,
  InputBase,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState, memo } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IMAGES, THEME } from "../utils/constants";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUploadDocument,
  getChats,
  getChatUsers,
  uploadDocument,
} from "../redux/commonReducer";
import { socket } from "../utils/socket";
import { toast } from "react-toastify";
import { DownloadFile } from "../utils/Helper";
import { Download } from "@mui/icons-material";

const LeftMessage = ({ text, img, firstName, img2, imageType }) => {
  return (
    <Stack direction="row" flex={1} sx={{ py: 0.5 }}>
      <Stack direction="row" gap={1} flex={0.45}>
        <Stack sx={{ flex: 0.1 }} direction="row" alignItems="flex-end">
          {img ? (
            <Box
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
              }}
            >
              <img
                src={img}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  marginTop: "-3px",
                  textTransform: "capitalize",
                  color: "#fff",
                }}
              >
                {firstName?.slice(0, 1)}
              </p>
            </Box>
          )}
        </Stack>
        <Box
          sx={{
            flex: 1,
          }}
        >
          {img2 ? (
            imageType?.split("/")[0] === "image" ? (
              <Box
                sx={{ backgroundColor: "#f5f5f5", p: 1, borderRadius: "5px" }}
              >
                <img
                  src={img2}
                  style={{
                    height: "120px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <IconButton onClick={() => DownloadFile(img2)}>
                  <Download sx={{ color: THEME.COLORS.primary }} />
                </IconButton>
              </Box>
            ) : imageType?.split("/")[0] === "video" ? (
              <video style={{ height: "120px", width: "100%" }} controls>
                <source src={img2} type={imageType} />
              </video>
            ) : imageType?.split("/")[0] === "audio" ? (
              <audio controls>
                <source src={img2} type={imageType} />
              </audio>
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
                    <IconButton onClick={() => DownloadFile(img2)}>
                      <Download sx={{ color: THEME.COLORS.primary }} />
                    </IconButton>
                  </Box>
                </Stack>
              )
            )
          ) : (
            <Box
              sx={{
                  background: "rgb(255,255,255,0.1)",
                color:THEME.COLORS.text,
                // border: "1px solid #AEAEAE",
                borderRadius: "5px",
                py: 1,
                px: 1,
              }}
            >
              <Typography style={{ fontSize: "14px" }}>{text}</Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};
const RightMessage = ({ text, img, firstName, img2, imageType }) => {
  return (
    <Stack direction="row" flex={1} justifyContent="flex-end" sx={{ py: 0.5 }}>
      <Stack direction="row" gap={1} flex={0.45}>
        <Box sx={{ flex: 1 }}>
          {img2 ? (
            imageType?.split("/")[0] === "image" ? (
              <Box
                sx={{ backgroundColor: "#0A3444", p: 1, borderRadius: "5px" }}
              >
                <img
                  src={img2}
                  style={{
                    height: "120px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
                <IconButton onClick={() => DownloadFile(img2)}>
                  <Download sx={{ color: '#f5f5f5' }} />
                </IconButton>
              </Box>
            ) : imageType?.split("/")[0] === "video" ? (
              <video style={{ height: "120px", width: "100%" }} controls>
                <source src={img2} type={imageType} />
              </video>
            ) : imageType?.split("/")[0] === "audio" ? (
              <audio controls>
                <source src={img2} type={imageType} />
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

                    <IconButton onClick={() => DownloadFile(img2)}>
                      <Download sx={{ color: "#f5f5f5" }} />
                    </IconButton>
                  </Box>
                </Stack>
              )
            )
          ) : (
            <Box
              sx={{
                background: THEME.COLORS.primary,
                border: "none",
                borderRadius: "5px",
                py: 1,
                px: 1,
              }}
            >
              <Typography
                style={{ fontSize: "14px", color: "#fff", display: "inline" }}
              >
                {text}
              </Typography>
            </Box>
          )}
        </Box>
        <Stack sx={{ flex: 0.1 }} direction="row" alignItems="flex-end">
          {img ? (
            <Box
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
              }}
            >
              <img
                src={img}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  textTransform: "capitalize",
                  color: "#fff",
                  marginTop: "-3px",
                  fontWeight: 600,
                }}
              >
                {firstName?.slice(0, 1)}
              </p>
            </Box>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
const Chats = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    getChatUsers_isLoading,
    getChatUsers_Data,

    getChats_isLoading,
    getChats_Data,

    getProfile_Data,

    uploadDocument_isLoading,
    uploadDocument_Data,
    uploadDocument_isError,
  } = useSelector((store) => store.commonStore);
  const chatel = document.getElementById("chatscroll");
  const [state, setState] = useState({
    anchor: null,
    role: "CONTRACTOR",
    userId: "",
    userFirstname: "",
    userLastname: "",
    userImage: "",
  });
  const [message, setMessage] = useState("");
  const [showData, setShowData] = useState([]);
  const [listenUserList, setListenUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [imagetype, setImageype] = useState("");
  const handleMoreChat = () => {
    if (Number(getChats_Data?.totalPage) > page) {
      setPage((prev) => prev + 1);
    }
  };
  const open = Boolean(state.anchor);
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };
  const handleClickContractor = () => {
    setState({ ...state, anchor: null, role: "CONTRACTOR" });
  };
  const handleClickWorker = () => {
    setState({ ...state, anchor: null, role: "WORKER" });
  };
  const handleSubmit = (img, imagetype) => {
    if (message.trim() || img) {
      const body = {
        message: message,
        recipientId: state.userId,
        type: img ? "ATTACHMENT" : "SMS",
        senderId: getProfile_Data?.data?._id,
        createdAt: new Date(),
        directChat: true,
        attachment: {
          type: imagetype ? imagetype : "",
          value: img ? img : "",
        },
        senderDetails: {
          profile_pic: "",
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
  const handleSearch = (e) => {
    if (e.target.value) {
      const filtered = getChatUsers_Data?.data?.filter((item) =>
        String(item?.firstName)
          .toLowerCase()
          .includes(String(e.target.value).toLowerCase())
      );
      console.log(filtered, "in filtered");
      setUserList(filtered);
    } else {
      setUserList(getChatUsers_Data?.data);
    }
    setSearch(e.target.value);
  };
  const handleClickUser = (item) => {
    if (item.userId === state.userId) {
      return;
    }
    setState({
      ...state,
      userId: item?.userId,
      userFirstname: item?.firstName,
      userLastname: item?.lastName,
      userImage: item?.profile_pic,
    });
    setPage(1);
    setShowData([]);
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

  socket.emit("join", { userId: getProfile_Data?.data?._id }, (args) => {
    console.log(args);
  });

  socket.off("sendMessageListen").on("sendMessageListen", (args) => {
    console.log(args, "in chat callback");
    if (state.userId && state.userId === args.senderId) {
      console.log("in call");
      setShowData((prev) => [...prev, args]);
    }
  });

  socket.off("usersListEmit").on("usersListEmit", (args) => {
    console.log(args, "in user list");
    if (args && args?.length > 0) {
      const fitered = args?.filter((item, i) => item.role === state.role);
      setUserList(fitered);
      setListenUserList(args);
    }
  });

  useEffect(() => {
    if (uploadDocument_Data) {
      handleSubmit(uploadDocument_Data?.data, imagetype);

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
    return () => socket.emit("end");
  }, []);
  useEffect(() => {
    const searchId = searchParams.get("id");
    const searchRole = searchParams.get("role");
    if (searchId) {
      const body = {
        message: "Hi, This is Admin",
        recipientId: searchId,
        type: "SMS",
        senderId: getProfile_Data?.data?._id,
        createdAt: new Date(),
        directChat: true,
        attachment: {
          type: "",
          value: "",
        },
        senderDetails: {
          profile_pic: "",
          lastName: getProfile_Data?.data?.firstName,
          firstName: getProfile_Data?.data?.lastName,
        },
      };

      socket.emit("sendMessageEmit", body, (args) => {
        setShowData((prev) => [...prev, args]);
      });
      setState((prev) => ({ ...prev, role: searchRole, userId: searchId }));
    }
  }, []);
  useEffect(() => {
    if (getChatUsers_Data?.data) {
      const filteredData = getChatUsers_Data?.data?.filter(
        (item, i) => item?.role === state.role
      );
      setUserList(filteredData);
    }
  }, [getChatUsers_Data]);

  useEffect(() => {
    if (getChats_Data && getChats_Data?.data) {
      if (Number(getChats_Data?.currentPage) !== 1) {
        setShowData([...getChats_Data?.data, ...showData]);
      } else if (Number(getChats_Data?.currentPage) === 1) {
        setShowData(getChats_Data?.data);
      }
    }
  }, [getChats_Data]);
  useEffect(() => {
    if (showData?.length > 0 && page === 1) {
      if (chatel) {
        chatel.scrollTo({ top: chatel.scrollHeight, behavior: "smooth" });
      }
    }
  }, [showData]);
  useEffect(() => {
    if (getChatUsers_Data?.data && listenUserList.length === 0) {
      const filteredData = getChatUsers_Data?.data?.filter(
        (item, i) => item?.role === state.role
      );
      setUserList(filteredData);
    } else if (listenUserList.length > 0) {
      const filteredData = listenUserList?.filter(
        (item, i) => item?.role === state.role
      );
      setUserList(filteredData);
    }
  }, [state.role]);
  useEffect(() => {
    if (state.userId) {
      const body = {
        id: state.userId,
        page: page,
        limit: 30,
      };
      dispatch(getChats(body));
    }
  }, [state.userId, page]);
  useEffect(() => {
    const body = {
      page: 1,
      limit: 10,
      role: state.role,
    };

    dispatch(getChatUsers(body));
  }, []);

  return (
    <div>
      <Box
        sx={{
          px: 4,
          height: "83vh",
        }}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 500, pb: 1.5 ,color:THEME.COLORS.text}}>
          Chat
        </Typography>
        <Grid container columnSpacing={1.5} sx={{ height: "100%", backgroundColor: THEME.COLORS.backgroundPrimary, padding: '10px' }}>
          <Grid item xs={4} sx={{ height: "100%" }}>
            {/* Left side Section */}

            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pb: 1,color:THEME.COLORS.text }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {state.role}
                </Typography>
                <FilterListIcon
                  onClick={(e) => setState({ ...state, anchor: e.target })}
                  sx={{ cursor: "pointer" }}
                />

                <Menu
                  id="basic-menu"
                  anchorEl={state.anchor}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClickWorker}>Worker</MenuItem>
                  <MenuItem onClick={handleClickContractor}>
                    Contractor
                  </MenuItem>
                </Menu>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  backgroundColor: THEME.COLORS.backgroundSecondary,
                  input:{color: THEME.COLORS.white},
                  px: 2,
                  py: 0.2,
                  boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
                  borderRadius: "20px",
                }}
              >
                <SearchIcon sx={{ color: THEME.COLORS.text }} />
                <InputBase
                  fullWidth
                  placeholder="search...."
                  value={search}
                  onChange={handleSearch}
                />
              </Stack>
            </Box>

            <Box
              sx={{
                backgroundColor: THEME.COLORS.backgroundSecondary,
                boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
                borderRadius: "5px",
                overflowY: "scroll",
                height: "80%",
                mt: "3%",
              }}
            >
              {getChatUsers_isLoading ? (
                <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
                  <CircularProgress sx={{ color: THEME.COLORS.text }} />
                </Stack>
              ) : (
                userList.map((item, itemIndex) => (
                  <Box key={itemIndex} onClick={() => handleClickUser(item)}>
                    <Box
                      sx={{
                        cursor: "pointer",
                        px: 2,
                        backgroundColor:
                          state.userId === item?.userId ? THEME.COLORS.secondary : 'rgba(0,0,0,0.06)',
                        py: 1,
                        color: state.userId !== item?.userId ? THEME.COLORS.text : 'rgba(0,0,0,0.06)',
                        "&:hover": {
                          backgroundColor:
                            state.userId !== item?.userId && THEME.COLORS.primary,
                        },
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Stack direction="row" gap={1} alignItems="center">
                            <Box
                              sx={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                                backgroundColor: !item?.profile_pic && "blue",
                              }}
                            >
                              {item?.profile_pic ? (
                                <img
                                  src={item?.profile_pic}
                                  alt="profile pic"
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <p
                                  style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item?.firstName?.slice(0, 1)}
                                </p>
                              )}
                            </Box>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                textTransform="capitalize"
                                sx={{
                                  fontWeight: 600,
                                  color:
                                    state.userId === item?.userId && "#fff",
                                }}
                              >
                                {item?.firstName}
                              </Typography>
                              <p
                                style={{
                                  fontWeight: 500,
                                  color:
                                    state.userId === item?.userId
                                      ? item?.messageRead
                                        ? THEME.COLORS.white
                                        : "#fff"
                                      : item?.messageRead
                                        ? THEME.COLORS.white
                                        : THEME.COLORS.text,
                                }}
                              >
                                {item?.lastMessage}
                              </p>
                              {/* <p>Web Designer</p> */}
                            </Box>
                          </Stack>
                          {/* <Typography>Leslie Alexander</Typography> */}
                        </Box>
                        {/* <Typography
                            sx={{ color: state.userId === item?._id && "#fff" }}
                          >
                            5 min
                          </Typography> */}
                      </Stack>
                    </Box>
                    <Divider />
                  </Box>
                ))
              )}
            </Box>
          </Grid>
          <Grid item xs={8} sx={{ height: "100%" }}>
            {/* Right section */}

            {/* right top header */}
            {state.userId ? (
              <>
                <Box sx={{ height: "98%" }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.06)',
                      px: 2,
                      py: 1,
                      boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" gap={1} alignItems="center">
                        <Box
                          sx={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            backgroundColor: !state.userImage && "blue",
                          }}
                        >
                          {state.userImage ? (
                            <img
                              src={state.userImage}
                              alt="userImage"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                            />
                          ) : (
                            <p
                              style={{
                                textAlign: "center",
                                fontSize: "20px",
                                textTransform: "capitalize",
                              }}
                            >
                              {state?.userFirstname?.slice(0, 1)}
                            </p>
                          )}
                        </Box>
                        <Box sx={{color:THEME.COLORS.text}}>
                          <p>
                            {state.userFirstname}  {state.userLastname}
                          </p>
                          {/* <p>Web Designer</p> */}
                        </Box>
                      </Stack>
                      <MoreVertIcon
                        sx={{
                          color: THEME.COLORS.text,
                          fontSize: "1.7rem",
                          cursor: "pointer",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      py: 1,
                      height: "88%",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        backgroundColor: THEME.COLORS.backgroundSecondary,
                        boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
                        borderRadius: "5px",
                        height: "100%",
                      }}
                    >
                      <Box
                        id="chatscroll"
                        sx={{
                          py: 1,
                          px: 2,
                          width: "100%",
                          overflowY: "auto",
                          height: "88%",
                          backgroundColor: 'rgba(0,0,0,0.06)'
                        }}
                      >
                        {/*  message */}
                        {getChats_isLoading && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <CircularProgress
                              sx={{ color: THEME.COLORS.primary }}
                            />
                          </Stack>
                        )}
                        {!getChats_isLoading &&
                          Number(getChats_Data?.totalPage) > page && (
                            <Stack
                              direction="row"
                              justifyContent="center"
                              sx={{ pt: 3 }}
                            >
                              <Box
                                onClick={handleMoreChat}
                                sx={{
                                  backgroundColor: "#fff",
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
                          )}
                        {showData?.map((item, itemIndex) => (
                          <Box key={itemIndex}>
                            {item?.senderId == state.userId ? (
                              <LeftMessage
                                text={item?.message}
                                firstName={item?.senderDetails?.firstName}
                                img={item?.senderDetails?.profile_pic}
                                img2={item?.attachment?.value}
                                imageType={item?.attachment?.type}
                              />
                            ) : (
                              <RightMessage
                                text={item?.message}
                                firstName={getProfile_Data?.data?.firstName}
                                img={false}
                                img2={item?.attachment?.value}
                                imageType={item?.attachment?.type}
                              />
                            )}
                          </Box>
                        ))}

                        {/* bottom input with send buttton */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{
                            position: "absolute",
                            bottom: 10,
                            left: 10,
                            right: 10,
                            background: THEME.COLORS.backgroundPrimary,
                            
                            border: "none",
                            borderRadius: "3px",
                            py: 0.2,
                            pl: 2,
                            pr: 0.5,
                            zIndex: 4,
                          }}
                        >
                          {uploadDocument_isLoading ? (
                            <Stack
                              direction="row"
                              justifyContent="center"
                              sx={{ width: "100%" }}
                            >
                              <CircularProgress
                                sx={{ color: THEME.COLORS.text }}
                              />
                            </Stack>
                          ) : (
                            <>
                              <InputBase
                                placeholder="write message.."
                                fullWidth
                                value={message}
                                onKeyPress={(e) =>
                                  e.key === "Enter" && handleSubmit()
                                }
                                onChange={(e) => setMessage(e.target.value)}
                              />
                              <Stack direction="row" alignItems="center">
                                <IconButton
                                  color="primary"
                                  aria-label="upload picture"
                                  component="label"
                                  sx={{
                                    p: 0.5,
                                    mr: 1,
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
                                  onClick={() => handleSubmit()}
                                  sx={{
                                    backgroundColor: THEME.COLORS.primary,
                                    borderRadius: "3px",
                                    pl: 0.7,
                                    pr: 0.4,
                                    py: 0.3,
                                    cursor: "pointer",
                                  }}
                                >
                                  <SendIcon
                                    sx={{
                                      transform: "rotate(-40deg)",
                                      color: "#fff",
                                    }}
                                  />
                                </Box>
                              </Stack>
                            </>
                          )}
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                    backgroundColor: THEME.COLORS.backgroundSecondary,
                  color:THEME.COLORS.text,
                  height: "98%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="p">To begin chatting, click on the user you want to talk to.</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default memo(Chats);
