import {
  Box,
  Button,
  CircularProgress,
  InputBase,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, memo } from "react";
import { THEME } from "../utils/constants";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSaveSetting,
  getSetting,
  saveSetting,
} from "../redux/commonReducer";
const StyledInput = styled(InputBase)(() => ({
  border: "2px solid #CFCFCF",
  padding: "5px 15px",
}));
const TermandCondition = () => {
  const {
    saveSetting_isLoading,
    saveSetting_Data,
    saveSetting_isError,

    getSetting_isLoading,
    getSetting_Data,
    getSetting_isError,
  } = useSelector((store) => store.commonStore);
  const [state, setState] = useState({
    term: "",
    about: "",
    help: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const body = {
      about: state.about,
      termsAndConditions: state.term,
      helpCentre: state.help,
    };
    dispatch(saveSetting(body));
  };
  useEffect(() => {
    if (getSetting_Data) {
      setState({
        ...state,
        term: getSetting_Data?.data?.termsAndConditions,
        about: getSetting_Data?.data?.about,
        help: getSetting_Data?.data?.helpCentre,
      });
    }
  }, [getSetting_Data]);
  useEffect(() => {
    dispatch(getSetting());
  }, []);
  useEffect(() => {
    if (saveSetting_Data) {
      toast.success("setting updated");
      dispatch(clearSaveSetting());
      dispatch(getSetting());
      setState({ ...state, term: "", about: "", help: "" });
    }
    if (saveSetting_isError) {
      toast.error("something wrong");
      dispatch(clearSaveSetting());
    }
  }, [saveSetting_Data, saveSetting_isError]);
  return (
    <div>
      <Box
        sx={{
          backgroundColor: THEME.COLORS.backgroundPrimary,
          px: 4,
          py: 1,
          pb: 2,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          minHeight: "70vh",
          m: 2,
        }}
      >
        <Typography sx={{ my: 2, px: 3, fontSize: "18px", fontWeight: 500, color: THEME.COLORS.text }}>
          Term and Conditions
        </Typography>
        <Box sx={{ px: 3 }}>
          <StyledInput
            placeholder="type term and conditions...."
            multiline
            maxRows={5}
            minRows={5}
            fullWidth
            value={state.term}
            onChange={(e) => setState({ ...state, term: e.target.value })}
            sx={{color: THEME.COLORS.text}}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{ my: 2, px: 3, fontSize: "18px", fontWeight: 500, color: THEME.COLORS.text }}
        >
          About App
        </Typography>
        <Box sx={{ px: 3 }}>
          <StyledInput
            placeholder="type about app...."
            multiline
            maxRows={5}
            minRows={5}
            fullWidth
            value={state.about}
            onChange={(e) => setState({ ...state, about: e.target.value })}
            sx={{color: THEME.COLORS.text}}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{ my: 2, px: 3, fontSize: "18px", fontWeight: 500, color: THEME.COLORS.text }}
        >
          Help Center
        </Typography>
        <Box sx={{ px: 3 }}>
          <StyledInput
            placeholder="type term and conditions...."
            multiline
            maxRows={5}
            minRows={5}
            fullWidth
            value={state.help}
            onChange={(e) => setState({ ...state, help: e.target.value })}
            sx={{color: THEME.COLORS.text}}
          />
        </Box>
        <Stack direction="row" justifyContent="flex-end" sx={{ my: 2, mx: 3 }}>
          {saveSetting_isLoading ? (
            <CircularProgress sx={{ color: THEME.COLORS.text }} />
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
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
    </div>
  );
};

export default memo(TermandCondition);
