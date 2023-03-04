import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LayOut = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "90vh",
        marginTop: "10vh",
      }}
    >
      {/* sidebar  */}
      <div
        style={{
          width: "21%",
          // backgroundColor: "red",
        }}
      >
        <Sidebar />
      </div>
      {/* navigation screens */}
      <div
        style={{
          // backgroundColor: "blue",
          width: "100%",
          padding: "13px",
          overflowY: "scroll",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LayOut;
