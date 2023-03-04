import {
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGES, THEME } from "../utils/constants";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import {
  changePassword,
  clearChangePassword,
  logOut,
} from "../redux/AuthReducer";
import { toast } from "react-toastify";
import BackNavigate from "../components/BackNavigate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}


const Profile = () => {
  const { getProfile_Data } = useSelector((store) => store.commonStore);
  const {
    changePassword_isLoading,
    changePassword_Data,
    changePassword_isError,
  } = useSelector((store) => store.authStore);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    oldPassword: "",
    oldPasswordType: false,
    newPassword: "",
    newPasswordType: false,
    confirmPassword: "",
    confirmPasswordType: false,
    passwordErr: {},
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    let err = {};
    if (!state.oldPassword.trim()) {
      err.oldPassword = "Old Password is required";
    }
    if (!state.newPassword.trim()) {
      err.newPassword = "new password is required";
    }
    if (!state.confirmPassword.trim()) {
      err.confirmPassword = "confirm password required";
    } else if (state.newPassword !== state.confirmPassword) {
      err.confirmPassword = "password do not match";
    }
    if (Object.keys(err).length === 0) {
      const body = {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      };
      dispatch(changePassword(body));
      setState({ ...state, passwordErr: {} });
    } else {
      setState({ ...state, passwordErr: err });
    }
  };
  useEffect(() => {
    if (changePassword_Data) {
      toast.success("Password Change Successfully");
      dispatch(clearChangePassword());
      dispatch(logOut());
    }
    if (changePassword_isError) {
      toast.error(
        changePassword_isError?.message
          ? changePassword_isError?.message
          : "somthing went wrong"
      );
      dispatch(clearChangePassword());
    }
  }, [changePassword_Data, changePassword_isError]);
  return (
    <>
      <BackNavigate />
      <Box
        sx={{
          backgroundColor: "#fff",
          px: 4,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          m: 2,
          maxWidth: '600px',
          margin: 'auto'
        }}
      >
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{ color: "#000", fontSize: "18px", fontWeight: 500 }}
              variant="h5"
            >
              Profile
            </Typography>
            <Button variant="contained" color="info" onClick={handleClickOpen}>
              Update Password
            </Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack alignItems="center">
            <Box>
              <img alt="profile" src={IMAGES.adminImage} />
            </Box>
            <Stack direction="row" gap={4}>
              <Box sx={{ mt: 3 }}>
                <Stack
                  direction="row"
                  sx={{ flex: 1, width: "100%", mb: 2 }}
                  gap={3}
                  alignItems="center"
                  textAlign="center"
                >
                  {/* <Stack direction="row" sx={{ flex: 1 }}>
                     <Typography
                      variant="subtitle1"
                      sx={{ color: THEME.COLORS.detailText, fontSize: "20px" }}
                    >
                      Name
                    </Typography> 
                  </Stack>*/}

                  <Stack direction="row" justifyContent="space-evenly" sx={{ margin: 'auto' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {`${getProfile_Data?.data?.firstName}`}&nbsp;{`${getProfile_Data?.data?.lastName}`}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  sx={{ flex: 1, width: "100%" }}
                  gap={3}
                  alignItems="center"
                >
                  {/* <Stack direction="row" sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: THEME.COLORS.detailText, fontSize: "20px" }}
                    >
                      Email
                    </Typography> 
                  </Stack>*/}

                  <Stack direction="row" sx={{ flex: 1 }} sx={{ margin: 'auto' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {getProfile_Data?.data?.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5 }} />


        </Box>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}
        sx={{width: '600px'}}>
          Update Password
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ px: 6 }}>

            <Stack>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                    Old Password
                  </Typography>
                  <TextField
                    type={state.oldPasswordType ? "text" : "password"}
                    variant="standard"
                    placeholder="**********"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {state.oldPasswordType ? (
                            <VisibilityIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({ ...state, oldPasswordType: false })
                              }
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({ ...state, oldPasswordType: true })
                              }
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                    value={state.oldPassword}
                    onChange={(e) =>
                      setState({ ...state, oldPassword: e.target.value })
                    }
                  />
                  {state.passwordErr.oldPassword && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                      {state.passwordErr.oldPassword}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                    New Password
                  </Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="**********"
                    type={state.newPasswordType ? "text" : "password"}
                    value={state.newPassword}
                    onChange={(e) =>
                      setState({ ...state, newPassword: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {state.newPasswordType ? (
                            <VisibilityIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({ ...state, newPasswordType: false })
                              }
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({ ...state, newPasswordType: true })
                              }
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {state.passwordErr.newPassword && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                      {state.passwordErr.newPassword}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="**********"
                    type={state.confirmPasswordType ? "text" : "password"}
                    value={state.confirmPassword}
                    onChange={(e) =>
                      setState({ ...state, confirmPassword: e.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {state.confirmPasswordType ? (
                            <VisibilityIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({
                                  ...state,
                                  confirmPasswordType: false,
                                })
                              }
                            />
                          ) : (
                            <VisibilityOffIcon
                              sx={{ cursor: "pointer", color: "#000" }}
                              onClick={() =>
                                setState({
                                  ...state,
                                  confirmPasswordType: true,
                                })
                              }
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {state.passwordErr.confirmPassword && (
                    <Typography variant="body1" sx={{ color: "red" }}>
                      {state.passwordErr.confirmPassword}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Stack>

          </Box>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="flex-end">
            {changePassword_isLoading ? (
              <CircularProgress
                sx={{ color: THEME.COLORS.primary }}
                size={35}
              />
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                endIcon={<TrendingFlatIcon sx={{ color: "#fff" }} />}
                sx={{
                  backgroundColor: THEME.COLORS.primary,
                  py: 1.5,
                  px: 5,
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
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default memo(Profile);
