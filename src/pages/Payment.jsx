import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { THEME } from "../utils/constants";
import PaymentTableHeading from "../components/PaymentTableHeading";
import { paymentTableData } from "../utils/dummyData";
import PaymentTableItem from "../components/PaymentTableItem";
import { useDispatch } from "react-redux";

const Payment = () => {
  const [state, setState] = useState({
    menu: 0,
    anchor: null,
  });
  const dispatch = useDispatch();

  const open = Boolean(state.anchor);
  const handleClose = () => {
    setState({ ...state, anchor: null });
  };
  const handleCloseContractor = () => {
    setState({ ...state, anchor: null, menu: 0 });
  };
  const handleCloseWorker = () => {
    setState({ ...state, anchor: null, menu: 1 });
  };
  return (
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
          Payment
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.7}
          sx={{ cursor: "pointer" }}
          onClick={(e) => setState({ ...state, anchor: e.target })}
        >
          <Typography sx={{ color: "#000" }} variant="h6">
            {state.menu ? "Worker" : "Contractor"}
          </Typography>
          <KeyboardArrowDownIcon
            sx={{ color: THEME.COLORS.primary, mb: "-5px" }}
          />
        </Stack>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={state.anchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleCloseContractor}>Contractor</MenuItem>
        <MenuItem onClick={handleCloseWorker}>Worker</MenuItem>
      </Menu>

      <Box>
        <PaymentTableHeading />
        {paymentTableData?.map((item, itemIndex) => (
          <Box sx={{ my: 1.5 }}>
            <PaymentTableItem
              address={item.address}
              customer={item.customer}
              id={itemIndex + 1}
              payment={item.price}
              service={item.service}
              status={item.status}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default memo(Payment);
