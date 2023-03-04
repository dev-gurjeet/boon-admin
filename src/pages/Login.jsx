import {
  Box,
  Stack,
  TextField,
  Typography,
  Checkbox,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/AuthReducer";
import { IMAGES, THEME } from "../utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const Login = () => {
  const dispatch = useDispatch();

  const { login_isLoading, keepmelogin } = useSelector(
    (store) => store.authStore
  );
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordType: false,
    keep: false,
  });
  const handleSingIn = () => {
    const body = {
      email: state.email,
      password: state.password,
    };
    dispatch(login(body));
  };
  useEffect(() => {
    const tok = localStorage.getItem("boonKeepedLogin");
    if (tok) {
      setState({ ...state, keep: true });
    }
  }, []);
  useEffect(() => {
    if (state.keep) {
      localStorage.setItem("boonKeepedLogin", true);
    } else {
      localStorage.removeItem("boonKeepedLogin");
    }
  }, [state.keep]);
  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ height: "90vh", width: "80vw" }}>
          <Stack
            sx={{ flex: 1, backgroundColor: THEME.COLORS.authBackground }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{
                backgroundColor: THEME.COLORS.white,
                height: "150px",
                width: "150px",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ height: "140px", width: "140px" }}>
                <img
                  src={IMAGES.shortLogo}
                  alt="shortlogo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flex: 1,
              backgroundColor: THEME.COLORS.white,
              height: "100%",
            }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ px: 3 }}>
              <Typography variant="h3" fontWeight={600} textAlign="center">
                Welcome!
              </Typography>
              <Typography
                textAlign="center"
                variant="body1"
                fontSize="20px"
                lineHeight="22px"
              >
                To keep connected with us please login <br /> with your personal
                info
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                  Email
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="john@gmail.com"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </Box>
              <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                  Password
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  type={state.passwordType ? "text" : "password"}
                  placeholder="********"
                  value={state.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {state.passwordType ? (
                          <VisibilityIcon
                            sx={{ cursor: "pointer", color: "#000" }}
                            onClick={() =>
                              setState({
                                ...state,
                                passwordType: false,
                              })
                            }
                          />
                        ) : (
                          <VisibilityOffIcon
                            sx={{ cursor: "pointer", color: "#000" }}
                            onClick={() =>
                              setState({
                                ...state,
                                passwordType: true,
                              })
                            }
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
              </Box>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    checked={state.keep ? true : false}
                    onClick={() => setState({ ...state, keep: !state.keep })}
                  />
                  <Typography
                    sx={{
                      color: THEME.COLORS.black,
                    }}
                    variant="subtitle1"
                  >
                    Keep me logged in
                  </Typography>
                </Stack>
                {/* <Stack>
                  <Typography
                    sx={{
                      color: THEME.COLORS.black,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    variant="subtitle1"
                  >
                    Forgot Password
                  </Typography>
                </Stack> */}
              </Stack>
              {login_isLoading ? (
                <CircularProgress
                  sx={{ color: THEME.COLORS.primary }}
                  size={35}
                />
              ) : (
                <Button
                  onClick={handleSingIn}
                  sx={{
                    backgroundColor: THEME.COLORS.primary,
                    mt: 3,
                    width: "100%",
                    "&:hover": {
                      backgroundColor: THEME.COLORS.primary,
                    },
                  }}
                  variant="contained"
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default memo(Login);
