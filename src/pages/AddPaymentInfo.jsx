import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, memo } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { THEME } from "../utils/constants";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useDispatch, useSelector } from "react-redux";
import {
  getDirectTransferDetails,
  getETransferDetails,
  saveDirectTransfer,
  saveETransfer,
} from "../redux/PaymentReducer";
import { PhotoCamera } from "@mui/icons-material";
import { clearUploadDocument, uploadDocument } from "../redux/commonReducer";
import { toast } from "react-toastify";
const AddPaymentInfo = () => {
  const [state, setState] = useState({
    anchor: null,
    menu: 0,
    payeeName: "",
    payeeEmail: "",
    notes: "",
    institueName: "",
    AccountNumber: "",
    TransitNumber: "",
    image: "",
  });
  const {
    saveDirectTransfer_isLoading,
    saveDirectTransfer_Data,
    saveDirectTransfer_isError,

    saveETransfer_isLoading,
    saveETransfer_Data,
    saveETransfer_isError,

    getDirectTransferDetails_isLoading,
    getDirectTransferDetails_Data,
    getDirectTransferDetails_isError,

    getETransferDetails_isLoading,
    getETransferDetails_Data,
    getETransferDetails_isError,
  } = useSelector((store) => store.paymentStore);

  const {
    uploadDocument_isLoading,
    uploadDocument_Data,
    uploadDocument_isError,
  } = useSelector((store) => store.commonStore);
  const dispatch = useDispatch();
  const open = Boolean(state.anchor);
  const handleCloseETransfer = () => {
    setState({ ...state, anchor: null, menu: 0 });
  };
  const handleCloseModify = () => {
    setState({ ...state, anchor: null, menu: 1 });
  };

  const handleClose = () => {
    setState({ ...state, anchor: null });
  };

  const handleSubmitDirectTransfer = () => {
    const body = {
      instituteName: state.institueName,
      accountNumber: state.AccountNumber,
      transitNumber: state.TransitNumber,
      image: state.image,
    };
    dispatch(saveDirectTransfer(body));
  };
  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    dispatch(uploadDocument(formData));
  };
  const handleSubmitETransfer = () => {
    const body = {
      payeeName: state.payeeName,
      payeeEmailId: state.payeeEmail,
      notes: state.notes,
    };
    dispatch(saveETransfer(body));
  };
  useEffect(() => {
    if (uploadDocument_Data) {
      setState({ ...state, image: uploadDocument_Data?.data });
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
    if (getDirectTransferDetails_Data) {
      setState({
        ...state,
        institueName: getDirectTransferDetails_Data?.data?.instituteName,
        AccountNumber: getDirectTransferDetails_Data?.data?.accountNumber,
        TransitNumber: getDirectTransferDetails_Data?.data?.transitNumber,
        image: getDirectTransferDetails_Data?.data?.image,
      });
    }
  }, [getDirectTransferDetails_Data]);
  useEffect(() => {
    if (getETransferDetails_Data) {
      setState({
        ...state,
        payeeName: getETransferDetails_Data?.data?.payeeName,
        payeeEmail: getETransferDetails_Data?.data?.payeeEmailId,
        notes: getETransferDetails_Data?.data?.notes,
      });
    }
  }, [getETransferDetails_Data]);
  useEffect(() => {
    dispatch(getDirectTransferDetails());
  }, [saveDirectTransfer_Data]);
  useEffect(() => {
    dispatch(getETransferDetails());
  }, [saveETransfer_Data]);
  return (
    <Box
      sx={{
        backgroundColor: THEME.COLORS.backgroundPrimary,
        px: 2,
        py: 1,
        boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
        borderRadius: "5px",
        my: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 5, mt: 1 }}
      >
        <Typography
          sx={{
            color: THEME.COLORS.text,
            fontSize: "18px",
            fontWeight: 500,
          }}
          variant="h5"
        >
          Add Payment Info
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.7}
          sx={{ cursor: "pointer" }}
          onClick={(e) => setState({ ...state, anchor: e.target })}
        >
          <Typography sx={{ color: THEME.COLORS.text }} variant="h6">
            {state.menu ? "Direct Transfer" : "E-Transfer"}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{ color: THEME.COLORS.text, mb: "-5px" }}
          />
        </Stack>
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
          <MenuItem onClick={handleCloseETransfer}>E-Transfer</MenuItem>
          <MenuItem onClick={handleCloseModify}>Direct Deposit</MenuItem>
        </Menu>
      </Box>
      {/* E Transfer */}
      {getDirectTransferDetails_isLoading || getETransferDetails_isLoading ? (
        <Stack direction="row" justifyContent="center">
          <CircularProgress sx={{ color: THEME.COLORS.primary }} />
        </Stack>
      ) : (
        <>
          {state.menu === 0 && (
            <Box sx={{ px: 6 }}>
              <Stack direction="row" gap={20}>
                <Box sx={{ mt: 4, flex: 1 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                    Payee Name
                  </Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="type name"
                    value={state.payeeName}
                    onChange={(e) =>
                      setState({ ...state, payeeName: e.target.value })
                    }
                    sx={{
                      input: {
                        color: THEME.COLORS.text
                      }
                    }}
                  />
                </Box>
                <Box sx={{ mt: 4, flex: 1 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                    Payee Email ID
                  </Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="john@gmail.com"
                    value={state.payeeEmail}
                    onChange={(e) =>
                      setState({ ...state, payeeEmail: e.target.value })
                    }
                    sx={{
                      input: {
                        color: THEME.COLORS.text
                      }
                    }}
                  />
                </Box>
              </Stack>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                  Notes
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="type some notes"
                  value={state.notes}
                  onChange={(e) =>
                    setState({ ...state, notes: e.target.value })
                  }
                  sx={{
                    input: {
                      color: THEME.COLORS.text
                    }
                  }}
                />
              </Box>
              <Stack direction="row" justifyContent="flex-end" sx={{ py: 4 }}>
                {saveETransfer_isLoading ? (
                  <CircularProgress sx={{ color: THEME.COLORS.text }} />
                ) : (
                  <Button
                    onClick={handleSubmitETransfer}
                    variant="contained"
                    endIcon={<TrendingFlatIcon sx={{ color: "#fff" }} />}
                    sx={{
                      backgroundColor: THEME.COLORS.primary,
                      py: 1.5,
                      px: 10,
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: THEME.COLORS.primary,
                      },
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Box>
          )}
          {/* Direct Transfer */}
          {state.menu === 1 && (
            <Box sx={{ px: 6 }}>
              <Stack direction="row" gap={20}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                      Institute Name
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      placeholder="type institute name"
                      value={state.institueName}
                      onChange={(e) =>
                        setState({ ...state, institueName: e.target.value })
                      }
                      sx={{
                        input:{
                          color: THEME.COLORS.text                      }
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                      Transit Number
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      placeholder="type transit number"
                      value={state.TransitNumber}
                      onChange={(e) =>
                        setState({ ...state, TransitNumber: e.target.value })
                      }
                      sx={{
                        input:{
                          color: THEME.COLORS.text                      }
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                      Account Number
                    </Typography>
                    <TextField
                      variant="standard"
                      fullWidth
                      placeholder="type account number"
                      value={state.AccountNumber}
                      onChange={(e) =>
                        setState({ ...state, AccountNumber: e.target.value })
                      }
                      sx={{
                        input:{
                          color: THEME.COLORS.text                      }
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 600, color: THEME.COLORS.text }}>
                      Attachment
                    </Typography>
                    {state.image ? (
                      <Box sx={{ height: "150px", width: "350px" }}>
                        <img
                          src={state.image}
                          alt="attachment"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: "150px",
                          width: "350px",
                          backgroundColor: "rgba(0,0,0,0.5",
                        }}
                      ></Box>
                    )}
                  </Box>
                  {uploadDocument_isLoading ? (
                    <CircularProgress sx={{ color: THEME.COLORS.primary }} />
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      endIcon={<PhotoCamera />}
                      sx={{
                        backgroundColor: THEME.COLORS.primary,
                        textTransform: "capitalize",
                        my: 2,
                        "&:hover": {
                          backgroundColor: THEME.COLORS.primary,
                        },
                      }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleUpload}
                      />
                    </Button>
                  )}
                </Box>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" sx={{ py: 4 }}>
                {saveDirectTransfer_isLoading ? (
                  <CircularProgress sx={{ color: THEME.COLORS.primary }} />
                ) : (
                  <Button
                    disabled={uploadDocument_isLoading ? true : false}
                    onClick={handleSubmitDirectTransfer}
                    variant="contained"
                    endIcon={<TrendingFlatIcon sx={{ color: "#fff" }} />}
                    sx={{
                      backgroundColor: THEME.COLORS.primary,
                      py: 1.5,
                      px: 10,
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: THEME.COLORS.primary,
                      },
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Stack>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default memo(AddPaymentInfo);
