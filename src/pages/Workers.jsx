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
import { THEME } from "../utils/constants";
import DashboarTableItem from "../components/DashboarTableItem";
import { CustomPagination } from "../components/styledComponent";
import WorkerTableHeading from "../components/WorkerTableHeading";
import WorkerTableItem from "../components/WorkerTableItem";
import { clearUpdateuser, updateUser } from "../redux/commonReducer";
import { getAllWorker } from "../redux/WorkerReducer";
import { dahboardTable, workerTAble } from "../utils/dummyData";
const Workers = () => {
  const dispatch = useDispatch();
  const { getWorker_isLoading, getWorker_Data, getWorker_isError } =
    useSelector((store) => store.workerStore);
  const [state, setState] = useState(1);
  const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
    useSelector((store) => store.commonStore);

  const onChangePage = (e, value) => {
    const body = {
      page: value,
      limit: 10,
    };
    setState(value);
    dispatch(getAllWorker(body));
  };
  useEffect(() => {
    if (updateUser_Data) {
      toast.success("user updated");
      dispatch(clearUpdateuser());
      const body = {
        page: state,
        limit: 10,
      };
      dispatch(getAllWorker(body));
    }
    if (updateUser_isError) {
      toast.error(
        updateUser_isError?.message
          ? updateUser_isError?.message
          : "something went wrong"
      );
      dispatch(clearUpdateuser());
    }
  }, [updateUser_Data, updateUser_isError]);
  useEffect(() => {
    const body = {
      page: state,
      limit: 10,
    };
    dispatch(getAllWorker(body));
  }, [updateUser_Data]);
  useEffect(() => {
    if (getWorker_Data) {
      setState(getWorker_Data?.currentPage);
    }
  }, [getWorker_Data]);
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#fff",
          px: 2,
          py: 1,
          boxShadow: "0.5px 3px 10px rgba(119, 119, 119, 0.1)",
          borderRadius: "5px",
          minHeight: "70vh",
          m: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 5, mt: 1 }}
        >
          <Typography sx={{ color: "#000", fontSize: "18px", fontWeight: 500 }}>
            Workers
          </Typography>
        </Stack>
        <WorkerTableHeading />
        <Divider sx={{ mt: 0.5 }} />
        {getWorker_isLoading || updateUser_isLoading ? (
          <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
            <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
          </Stack>
        ) : (
          getWorker_Data?.data?.map((item, itemIndex) => (
            <Box key={itemIndex}>
              <WorkerTableItem
                id={(getWorker_Data?.currentPage - 1) * 10 + itemIndex + 1}
                dbId={item?._id}
                address={item?.address?.formattedAddress}
                jobid={item?.jobid}
                name={item?.firstName}
                phone={item?.phoneNumber}
                totalHours={item?.totalHours}
                img={item?.profile_pic}
                checked={item?.isActive}
                categories={item?.categories}
              />
              <Divider sx={{ mt: 0.5 }} />
            </Box>
          ))
        )}
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getWorker_Data?.totalPage}
          defaultPage={state}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </div>
  );
};

export default memo(Workers);
