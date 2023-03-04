import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import Person from "@mui/icons-material/Person";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { THEME } from "../utils/constants";
import DashboardTableHeading from "../components/DashboardTableHeading";
import DashboarTableItem from "../components/DashboarTableItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dahboardTable } from "../utils/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardCount } from "../redux/commonReducer";
import Workers from "./Workers";
import Contractor from "./Contractor";
import DashboardWorker from "./DashboardWorker";
import DashboardContractor from "./DashboardContranctor";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardCount_Data } = useSelector((store) => store.commonStore);
  const [state, setState] = useState({
    menu: 0,
    anchor: null,
  });
  const open = Boolean(state.anchor);
  const handleCloseContractor = () => {
    setState({ ...state, menu: 0 });
  };
  const handleCloseWorker = () => {
    setState({ ...state, menu: 1 });
  };
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };
  console.log("state menu", state.menu)
  useEffect(() => {
    dispatch(getDashboardCount());
  }, []);
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <DashboardCard
          icon={
            <Person sx={{ color: THEME.COLORS.primary, fontSize: "40px" }} />
          }
          name="Total Customer"
          number={dashboardCount_Data?.data?.totalCustomers}
        />
        <DashboardCard
          icon={
            <MiscellaneousServicesIcon
              sx={{ color: THEME.COLORS.primary, fontSize: "40px" }}
            />
          }
          name="Total Workers"
          number={dashboardCount_Data?.data?.totalWorkers}
        />
        <DashboardCard
          icon={
            <CalendarMonthIcon
              sx={{ color: THEME.COLORS.primary, fontSize: "40px" }}
            />
          }
          name="Total Booking"
          number={dashboardCount_Data?.data?.totalBookings}
        />
        <DashboardCard
          icon={
            <SupervisorAccountIcon
              sx={{ color: THEME.COLORS.primary, fontSize: "40px" }}
            />
          }
          name="Total Contractor"
          number={dashboardCount_Data?.data?.totalContractors}
        />
      </Stack>
      <Box
        sx={{
          backgroundColor: "#fff",
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
            sx={{ color: "#000", fontSize: "18px", fontWeight: 500 }}
            variant="h5"
          >
            {state.menu ? "Total Workers" : "Total Contractors"}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.7}
            sx={{ cursor: "pointer" }}
          // onClick={(e) => setState({ ...state, anchor: e.target })}
          >
            <ToggleButtonGroup
              color="secondary"
              value={state.menu}
              // exclusive
              // onChange={(e, change) => handleToggle(change)}
              aria-label="Platform"
            >
              <ToggleButton style={!state.menu ? { backgroundColor: "#0a3444", color: '#fff' }: {}} value="0" onClick={handleCloseContractor}>Contractors</ToggleButton>
              <ToggleButton style={state.menu ? { backgroundColor: "#0a3444", color: '#fff' }: {}} value="1" onClick={handleCloseWorker}>Workers</ToggleButton>
            </ToggleButtonGroup>
            {/* <Typography
              sx={{ color: "#000", fontSize: "18px", fontWeight: 500 }}
            >
              {state.menu ? "Worker" : "Contractor"}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{ color: THEME.COLORS.primary, mb: "-5px" }}
            /> */}
          </Stack>
        </Stack>
        <Menu
          id="basic-menu"
          // anchorEl={state.anchor}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleCloseContractor}>Contractor</MenuItem>
          <MenuItem onClick={handleCloseWorker}>Worker</MenuItem>
        </Menu>
        <Box sx={{ marginTop: "-30px" }}>
          {state.menu ? <DashboardWorker /> : <DashboardContractor />}
        </Box>
      </Box>
    </div>
  );
};

export default memo(Dashboard);
