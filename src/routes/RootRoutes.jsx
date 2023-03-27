import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import LayOut from "../layout/LayOut";
import { PATH } from "../utils/constants";
import Dashboard from "../pages/Dashboard";
import Contractor from "../pages/Contractor";
import Workers from "../pages/Workers";
import Categories from "../pages/Categories";
import Booking from "../pages/Booking";
import Chats from "../pages/Chats";
import Notifications from "../pages/Notifications";
import Reviews from "../pages/Reviews";
import TermandCondition from "../pages/TermandCondition";
import ContractorDetail from "../pages/ContractorDetail";
import WorkerDetail from "../pages/WorkerDetail";
import Login from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import BookingDetail from "../pages/BookingDetail";
import Payment from "../pages/Payment";
import AddPaymentInfo from "../pages/AddPaymentInfo";
import PaymentDetail from "../pages/PaymentDetail";
import Profile from "../pages/Profile";
import { logOut } from "../redux/AuthReducer";
import { socket } from "../utils/socket";
import JobChat from "../pages/JobChat";
import ActiveWorkers from "../pages/ActiveWorkers";
const RootRoutes = () => {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const { getProfile_Data } = useSelector((store) => store.commonStore);
  const {
    login_isLoading,
    login_Data,
    login_isError,
    logOut_Data,
    keepmelogin,
  } = useSelector((store) => store.authStore);
  let localToken = false;
  const token = localStorage.getItem("boonAdmin");
  const dt = new Date();
  if (token) {
    try {
      const parsetoken = JSON.parse(token);
      const { exp } = jwt_decode(parsetoken.data);
      if (dt.getTime() < exp * 1000) {
        localToken = true;
      } else {
        localToken = false;
      }
    } catch (error) { }
  }
  useEffect(() => {
    if (login_Data) {
      setState(true);
    }
  }, [login_Data]);

  useEffect(() => {
    if (logOut_Data) {
      setState(false);
    }
  }, [logOut_Data]);

  return (
    <>
      {!state && !localToken ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path={PATH.Dashboard} element={<LayOut />}>
              <Route path={PATH.Dashboard} element={<Dashboard />} />
              <Route path={PATH.Contractor} element={<Contractor />} />
              <Route
                path={`${PATH.ContractorDetail}/:id`}
                element={<ContractorDetail />}
              />
              <Route
                path={`${PATH.WorkerDetail}/:id`}
                element={<WorkerDetail />}
              />
              <Route path={PATH.Worker} element={<Workers />} />
              <Route path={PATH.ActiveWorker} element={<ActiveWorkers />} />
              <Route path={PATH.Category} element={<Categories />} />
              <Route path={PATH.Bookings} element={<Booking />} />
              <Route
                path={`${PATH.BookingDetail}/:jobid`}
                element={<BookingDetail />}
              />
              <Route path={PATH.Chat} element={<Chats />} />
              <Route
                path={`${PATH.jobChat}/:jobid/:contractorId`}
                element={<JobChat />}
              />
              <Route path={PATH.Notification} element={<Notifications />} />
              <Route path={PATH.Reviews} element={<Reviews />} />
              <Route path={PATH.TermCond} element={<TermandCondition />} />
              <Route path={PATH.Payment} element={<Payment />} />
              <Route path={PATH.AddPaymentInfo} element={<AddPaymentInfo />} />
              <Route path={PATH.PaymentDetail} element={<PaymentDetail />} />
              <Route path={PATH.Profile} element={<Profile />} />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
};

export default RootRoutes;
