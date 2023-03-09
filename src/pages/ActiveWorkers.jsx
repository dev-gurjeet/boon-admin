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
import { CustomPagination } from "../components/styledComponent";
import WorkerTableHeading from "../components/WorkerTableHeading";
import WorkerTableItem from "../components/WorkerTableItem";
import { clearUpdateuser } from "../redux/commonReducer";
import { getAllActiveWorker } from "../redux/WorkerReducer";
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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

const ActiveWorkers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    getAllActiveWorker_isLoading,
    getAllActiveWorker_Data,
    getAllActiveWorker_isError,
  } = useSelector((store) => store.workerStore);
  const [state, setState] = useState(1);
  const [workerData, setWorkerData] = useState([]);
  const { updateUser_isLoading, updateUser_Data, updateUser_isError } =
    useSelector((store) => store.commonStore);

  const onChangePage = (e, value) => {
    const body = {
      page: value,
      limit: 10,
    };
    setState(value);
    dispatch(getAllActiveWorker(body));
  };
  useEffect(() => {
    if (updateUser_Data) {
      toast.success("user updated");
      dispatch(clearUpdateuser());
      const body = {
        page: state,
        limit: 10,
      };
      dispatch(getAllActiveWorker(body));
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
    dispatch(getAllActiveWorker(body));
  }, [updateUser_Data]);
  useEffect(() => {
    if (getAllActiveWorker_Data) {
      const filteredData = getAllActiveWorker_Data?.data?.filter(
        (item) => item?.isActive === true
      );
      setState(getAllActiveWorker_Data?.currentPage);
      setWorkerData(filteredData);
    }
  }, [getAllActiveWorker_Data]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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
            Active Workers
          </Typography>
        </Stack>

        <TableContainer component={Paper}>
          <Table className={classes.table} sx={{ minWidth: 700 }} aria-label="customized table">
            <WorkerTableHeading />
            <TableBody>
              {/* <Divider sx={{ mt: 0.5 }} /> */}
              {getAllActiveWorker_isLoading || updateUser_isLoading ? (
                <StyledTableCell align="center" colSpan="8">
                  <Stack direction="row" justifyContent="center" sx={{ my: 2 }}>
                    <CircularProgress sx={{ color: THEME.COLORS.primary }} size={40} />
                  </Stack>
                </StyledTableCell>
              ) : (
                workerData?.map((item, itemIndex) => (
                  // <Box key={itemIndex}>
                    <WorkerTableItem
                      id={
                        (getAllActiveWorker_Data?.currentPage - 1) * 10 +
                        itemIndex +
                        1
                      }
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
                    // <Divider sx={{ mt: 0.5 }} />
                  // </Box>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ px: 5, mb: 2 }}>
        <CustomPagination
          count={getAllActiveWorker_Data?.totalPage}
          defaultPage={state}
          shape="rounded"
          variant="outlined"
          onChange={onChangePage}
        />
      </Stack>
    </div>
  );
};

export default memo(ActiveWorkers);
