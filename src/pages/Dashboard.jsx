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
import Chart from 'react-apexcharts'
const Dashboard = ({ path, active, name, icon }) => {


  const dispatch = useDispatch();
  const { dashboardCount_Data } = useSelector((store) => store.commonStore);
  const [state, setState] = useState({
    menu: 0,
    anchor: null,
  });
  const [lineChart, setLineChart] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
        style: { color: '#fff' }
      },
      grid: {
        row: {
          colors: ['#000', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: {
            colors: "#fff"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff"
          }
        }
      }
    },


  }
  )
  const [chart, setChart] = useState({
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        labels: {
          style: {
            colors: "#fff"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff"
          }
        }
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
  })
  const [pieChart, setPieChart] = useState({

    series: [44, 56],
    options: {
      chart: {
        width: 380,
        type: 'pie',
        foreColor: '#373d3f'
      },
      labels: ['Users', 'Contractors'],
      style: { color: '#fff' },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
    },
  })
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
            <Person sx={{ color: THEME.COLORS.text, fontSize: "40px" }} />
          }
          name="Total Customer"
          number={dashboardCount_Data?.data?.totalCustomers}
        />
        <DashboardCard
          icon={
            <MiscellaneousServicesIcon
              sx={{ color: THEME.COLORS.text, fontSize: "40px" }}
            />
          }
          name="Total Workers"
          number={dashboardCount_Data?.data?.totalWorkers}
        />
        <DashboardCard
          icon={
            <CalendarMonthIcon
              sx={{ color: THEME.COLORS.text, fontSize: "40px" }}
            />
          }
          name="Total Booking"
          number={dashboardCount_Data?.data?.totalBookings}
        />
        <DashboardCard
          icon={
            <SupervisorAccountIcon
              sx={{ color: THEME.COLORS.text, fontSize: "40px" }}
            />
          }
          name="Total Contractor"
          number={dashboardCount_Data?.data?.totalContractors}
        />
      </Stack>
      <Box
        direction="row"
        alignItems="center"
        gap={0.7}
        sx={{
          backgroundColor: "#0f1c24",
          px: 2,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          my: 2,
          maxHeight: '800px',
          minHeight: '300px',
          display: "flex",
          justifyContent: "space-evenly"
        }}>
        <Chart options={pieChart.options} series={pieChart.series} type="pie" width="450" height="250" minHeight="auto"  />
        <Chart options={lineChart.options} series={lineChart.series} type="area" width="450" height="auto"/>
      </Box>
      <Box
        sx={{
          backgroundColor: "#0f1c24",
          px: 2,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          my: 2,
        }}>
        <Chart options={chart.options} series={chart.series} type="bar" width="100%" height={320} />
      </Box>
    </div>
  );
  return (<Box
    sx={{
      backgroundColor: "#0f1c24",
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
        sx={{ color: "#fff", fontSize: "18px", fontWeight: 500 }}
        variant="h5"
      >
        {state.menu ? "Total Workers" : "Total Contractors"}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.7}
        sx={{
          cursor: "pointer",
          ":hover": {
            backgroundColor: active ? THEME.COLORS.white : THEME.COLORS.text,
            color: THEME.COLORS.dark
          }
        }}
      // onClick={(e) => setState({ ...state, anchor: e.target })}
      >
        <ToggleButtonGroup
          color="secondary"
          value={state.menu}
          // exclusive
          // onChange={(e, change) => handleToggle(change)}
          aria-label="Platform"
        >
          <ToggleButton style={!state.menu ? { backgroundColor: "#fff", color: '#0b1e25' } : {}} value="0" onClick={handleCloseContractor}>Contractors</ToggleButton>
          <ToggleButton style={state.menu ? { backgroundColor: "#fff", color: '#0b1e25' } : {}} value="1" onClick={handleCloseWorker}>Workers</ToggleButton>
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
  </Box>)
};

export default memo(Dashboard);
