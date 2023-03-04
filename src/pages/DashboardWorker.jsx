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
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from "@mui/styles";

import { styled } from '@mui/material/styles';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableBody-root": {
      "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
      }
    }
  }
});
const DashboardWorker = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { getWorker_isLoading, getWorker_Data, getWorker_isError } =
    useSelector((store) => store.workerStore);
  const [state, setState] = useState(1);
  const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
    useSelector((store) => store.commonStore);
  const handleActiveInActive = (id, checked) => {
    const body = {
      userId: id,
      isActive: !checked,
    };
    dispatch(updateUser(body));
  };
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
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <Box
        sx={{
          px: 2,
          py: 1,
        }}
      >
        {getWorker_isLoading && !getWorker_Data.data ? (
          <Stack>
            <StyledTableRow aria-colspan={6}>
              <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
              </Stack>
            </StyledTableRow>
          </Stack>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} sx={{ minWidth: 700 }} aria-label="customized table">
              <WorkerTableHeading />
              <TableBody>{

                getWorker_Data?.data?.map((item, itemIndex) => (
                  // <Box key={itemIndex}>
                  <WorkerTableItem  key={itemIndex}
                    handleActiveInActive={handleActiveInActive}
                    id={(getWorker_Data?.currentPage - 1) * 10 + itemIndex + 1}
                    dbId={item?._id}
                    address={item?.address?.formattedAddress}
                    jobid={item?.jobid}
                    name={item?.firstName}
                    phone={item?.phoneNumber}
                    totalHours={item?.totalHours}
                    img={item?.profile_pic}
                    checked={item?.isActive}
                    isSuspended={item?.isSuspended}
                    categories={item?.categories}
                  />
                  // <Divider sx={{ mt: 0.5 }} />
                  // </Box>
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
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

export default memo(DashboardWorker);
