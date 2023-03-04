import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DashboardTableHeading from "../components/DashboardTableHeading";
import DashboarTableItem from "../components/DashboarTableItem";
import { CustomPagination } from "../components/styledComponent";
import { clearUpdateuser } from "../redux/commonReducer";
import { getAllContractors } from "../redux/ContractorReducer";
import { THEME } from "../utils/constants";
import { dahboardTable } from "../utils/dummyData";
const Contractor = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(1);
  const {
    getContractors_isLoading,
    getContractors_Data,
    getContractors_isError,
  } = useSelector((store) => store.contractorStore);
  const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
    useSelector((store) => store.commonStore);
  const onChangePage = (e, value) => {
    const body = {
      page: value,
      limit: 10,
    };
    setState(value);
    dispatch(getAllContractors(body));
  };
  useEffect(() => {
    const body = {
      page: state,
      limit: 10,
    };
    dispatch(getAllContractors(body));
  }, []);
  useEffect(() => {
    if (updateUser_Data) {
      toast.success("User Updated");
      dispatch(clearUpdateuser());
      const body = {
        page: state,
        limit: 10,
      };
      dispatch(getAllContractors(body));
    }
    if (updateUser_isError) {
      toast.error(
        updateUser_isError?.message
          ? updateUser_isError?.message
          : "somthing went wrong"
      );
      dispatch(clearUpdateuser());
    }
  }, [updateUser_Data, updateUser_isError]);

  useEffect(() => {
    setState(getContractors_Data?.currentPage);
  }, [getContractors_Data]);
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#fff",
          px: 2,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          m: 2,
          minHeight: "70vh",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 5, mt: 1 }}
        >
          <Typography sx={{ color: "#000", fontSize: "18px", fontWeight: 500 }}>
            Contractors
          </Typography>
        </Stack>
        <DashboardTableHeading />
        <Divider sx={{ mt: 0.5 }} />
        {getContractors_isLoading || updateUser_isLoading ? (
          <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
            <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
          </Stack>
        ) : (
          getContractors_Data?.data?.map((item, itemIndex) => (
            <Box key={itemIndex} sx={{ py: 1 }}>
              <DashboarTableItem
                id={(getContractors_Data?.currentPage - 1) * 10 + itemIndex + 1}
                dbId={item?._id}
                address={item?.address?.formattedAddress}
                email={item?.email}
                name={item?.firstName}
                phone={item?.phoneNumber}
                img={item?.profile_pic}
                checked={item?.isActive}
              />
              <Divider sx={{ mt: 0.5 }} />
            </Box>
          ))
        )}
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getContractors_Data?.totalPage}
          defaultPage={state}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </div>
  );
};

export default memo(Contractor);
